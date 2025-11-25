import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// POST /api/orders - 새 주문 생성
app.post('/', async (c) => {
  const { DB } = c.env
  
  try {
    const body = await c.req.json()
    const {
      user_id,
      restaurant_id,
      order_type, // 'delivery', 'pickup', 'reservation'
      items, // Array: [{ menu_id, quantity, price }]
      total_amount,
      delivery_address,
      delivery_phone,
      customer_request,
      payment_method
    } = body

    // 입력 검증
    if (!user_id || !restaurant_id || !order_type || !items || items.length === 0) {
      return c.json({ 
        success: false, 
        error: '필수 정보가 누락되었습니다.' 
      }, 400)
    }

    // 배달 주문인 경우 주소 필수
    if (order_type === 'delivery' && !delivery_address) {
      return c.json({ 
        success: false, 
        error: '배달 주소가 필요합니다.' 
      }, 400)
    }

    // 주문 번호 생성 (예: ORD20241125001)
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const order_number = `ORD${today}${randomNum}`

    // 주문 생성
    const insertResult = await DB.prepare(`
      INSERT INTO orders (
        order_number,
        user_id,
        restaurant_id,
        order_type,
        total_amount,
        delivery_address,
        delivery_phone,
        customer_request,
        payment_method,
        payment_status,
        order_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
    `).bind(
      order_number,
      user_id,
      restaurant_id,
      order_type,
      total_amount,
      delivery_address || null,
      delivery_phone || null,
      customer_request || null,
      payment_method || 'card'
    ).run()

    const orderId = insertResult.meta.last_row_id

    // 주문 항목 저장 (order_items 테이블이 있다면)
    // 현재는 items를 JSON으로 저장
    await DB.prepare(`
      UPDATE orders 
      SET items = ? 
      WHERE id = ?
    `).bind(JSON.stringify(items), orderId).run()

    return c.json({
      success: true,
      data: {
        order_id: orderId,
        order_number,
        message: '주문이 접수되었습니다.'
      }
    }, 201)

  } catch (error: any) {
    console.error('Order creation error:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// GET /api/orders/:id - 주문 상세 조회
app.get('/:id', async (c) => {
  const { DB } = c.env
  const orderId = c.req.param('id')

  try {
    const order = await DB.prepare(`
      SELECT 
        o.*,
        r.name as restaurant_name,
        r.phone as restaurant_phone,
        r.address as restaurant_address,
        u.name as customer_name,
        u.email as customer_email
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `).bind(orderId).first()

    if (!order) {
      return c.json({ 
        success: false, 
        error: '주문을 찾을 수 없습니다.' 
      }, 404)
    }

    // items JSON 파싱
    if (order.items) {
      try {
        order.items = JSON.parse(order.items as string)
      } catch (e) {
        order.items = []
      }
    }

    return c.json({
      success: true,
      data: order
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// GET /api/orders - 사용자 주문 목록
app.get('/', async (c) => {
  const { DB } = c.env
  const { user_id, status, limit = '20', offset = '0' } = c.req.query()

  if (!user_id) {
    return c.json({ 
      success: false, 
      error: '사용자 ID가 필요합니다.' 
    }, 400)
  }

  try {
    let query = `
      SELECT 
        o.*,
        r.name as restaurant_name,
        r.image_url as restaurant_image
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      WHERE o.user_id = ?
    `
    const params: any[] = [user_id]

    if (status) {
      query += ` AND o.order_status = ?`
      params.push(status)
    }

    query += ` ORDER BY o.created_at DESC LIMIT ? OFFSET ?`
    params.push(parseInt(limit), parseInt(offset))

    const result = await DB.prepare(query).bind(...params).all()

    // items JSON 파싱
    const orders = (result.results || []).map((order: any) => {
      if (order.items) {
        try {
          order.items = JSON.parse(order.items)
        } catch (e) {
          order.items = []
        }
      }
      return order
    })

    return c.json({
      success: true,
      data: orders,
      total: orders.length
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// PATCH /api/orders/:id/status - 주문 상태 업데이트 (관리자/사장님용)
app.patch('/:id/status', async (c) => {
  const { DB } = c.env
  const orderId = c.req.param('id')
  
  try {
    const { order_status } = await c.req.json()

    if (!order_status) {
      return c.json({ 
        success: false, 
        error: '주문 상태가 필요합니다.' 
      }, 400)
    }

    // 유효한 상태 값 확인
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'completed', 'cancelled']
    if (!validStatuses.includes(order_status)) {
      return c.json({ 
        success: false, 
        error: '유효하지 않은 주문 상태입니다.' 
      }, 400)
    }

    await DB.prepare(`
      UPDATE orders 
      SET order_status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(order_status, orderId).run()

    return c.json({
      success: true,
      message: '주문 상태가 업데이트되었습니다.'
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// DELETE /api/orders/:id - 주문 취소
app.delete('/:id', async (c) => {
  const { DB } = c.env
  const orderId = c.req.param('id')

  try {
    // 주문 상태 확인
    const order = await DB.prepare(`
      SELECT order_status FROM orders WHERE id = ?
    `).bind(orderId).first()

    if (!order) {
      return c.json({ 
        success: false, 
        error: '주문을 찾을 수 없습니다.' 
      }, 404)
    }

    // 이미 준비 중이거나 배달 중인 주문은 취소 불가
    if (['preparing', 'ready', 'delivering', 'completed'].includes(order.order_status as string)) {
      return c.json({ 
        success: false, 
        error: '취소할 수 없는 주문 상태입니다. 가게에 직접 문의해주세요.' 
      }, 400)
    }

    await DB.prepare(`
      UPDATE orders 
      SET order_status = 'cancelled',
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(orderId).run()

    return c.json({
      success: true,
      message: '주문이 취소되었습니다.'
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

export default app
