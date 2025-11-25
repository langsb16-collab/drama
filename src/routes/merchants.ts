import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// POST /api/merchants - 가맹점 신청
app.post('/', async (c) => {
  const { DB } = c.env
  
  try {
    const body = await c.req.json()
    const {
      business_name,
      owner_name,
      phone,
      email,
      address,
      category_id,
      region_id,
      business_number,
      description,
      signature_menu,
      business_hours
    } = body

    // 필수 항목 검증
    if (!business_name || !owner_name || !phone || !address) {
      return c.json({ 
        success: false, 
        error: '필수 정보가 누락되었습니다.' 
      }, 400)
    }

    // 신청 번호 생성
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const application_number = `MER${today}${randomNum}`

    // 가맹점 신청 저장
    const result = await DB.prepare(`
      INSERT INTO merchant_applications (
        application_number,
        business_name,
        owner_name,
        phone,
        email,
        address,
        category_id,
        region_id,
        business_number,
        description,
        signature_menu,
        business_hours,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).bind(
      application_number,
      business_name,
      owner_name,
      phone,
      email || null,
      address,
      category_id || null,
      region_id || null,
      business_number || null,
      description || null,
      signature_menu || null,
      business_hours || null
    ).run()

    return c.json({
      success: true,
      data: {
        id: result.meta.last_row_id,
        application_number,
        message: '가맹점 신청이 접수되었습니다. 영업일 기준 2-3일 내에 연락드리겠습니다.'
      }
    }, 201)

  } catch (error: any) {
    console.error('Merchant application error:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// GET /api/merchants/:id - 신청 상태 조회
app.get('/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')

  try {
    const application = await DB.prepare(`
      SELECT 
        ma.*,
        r.name_ko as region_name,
        cat.name_ko as category_name
      FROM merchant_applications ma
      LEFT JOIN regions r ON ma.region_id = r.id
      LEFT JOIN categories cat ON ma.category_id = cat.id
      WHERE ma.id = ? OR ma.application_number = ?
    `).bind(id, id).first()

    if (!application) {
      return c.json({ 
        success: false, 
        error: '신청 내역을 찾을 수 없습니다.' 
      }, 404)
    }

    return c.json({
      success: true,
      data: application
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// GET /api/merchants - 신청 목록 (관리자용)
app.get('/', async (c) => {
  const { DB } = c.env
  const { status, limit = '20', offset = '0' } = c.req.query()

  try {
    let query = `
      SELECT 
        ma.*,
        r.name_ko as region_name,
        cat.name_ko as category_name
      FROM merchant_applications ma
      LEFT JOIN regions r ON ma.region_id = r.id
      LEFT JOIN categories cat ON ma.category_id = cat.id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      query += ` AND ma.status = ?`
      params.push(status)
    }

    query += ` ORDER BY ma.created_at DESC LIMIT ? OFFSET ?`
    params.push(parseInt(limit), parseInt(offset))

    const result = await DB.prepare(query).bind(...params).all()

    return c.json({
      success: true,
      data: result.results || [],
      total: (result.results || []).length
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// PATCH /api/merchants/:id/status - 신청 상태 업데이트 (관리자용)
app.patch('/:id/status', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  try {
    const { status, rejection_reason } = await c.req.json()

    if (!status) {
      return c.json({ 
        success: false, 
        error: '상태 정보가 필요합니다.' 
      }, 400)
    }

    // 유효한 상태 확인
    const validStatuses = ['pending', 'approved', 'rejected', 'contacted']
    if (!validStatuses.includes(status)) {
      return c.json({ 
        success: false, 
        error: '유효하지 않은 상태입니다.' 
      }, 400)
    }

    await DB.prepare(`
      UPDATE merchant_applications 
      SET status = ?,
          rejection_reason = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(status, rejection_reason || null, id).run()

    return c.json({
      success: true,
      message: '신청 상태가 업데이트되었습니다.'
    })

  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

export default app
