import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// GET /api/restaurants - 맛집 목록 (필터링 지원)
app.get('/', async (c) => {
  const { DB } = c.env
  const { region, category, delivery, search, limit = '20', offset = '0' } = c.req.query()

  let query = `
    SELECT 
      r.*,
      rg.name_ko as region_name,
      cat.name_ko as category_name,
      cat.icon as category_icon
    FROM restaurants r
    LEFT JOIN regions rg ON r.region_id = rg.id
    LEFT JOIN categories cat ON r.category_id = cat.id
    WHERE r.status = 'active'
  `
  const params: any[] = []

  // 지역 필터
  if (region) {
    query += ` AND r.region_id = ?`
    params.push(region)
  }

  // 카테고리 필터
  if (category) {
    query += ` AND r.category_id = ?`
    params.push(category)
  }

  // 배달 가능 필터
  if (delivery === 'true') {
    query += ` AND r.delivery_available = 1`
  }

  // 검색
  if (search) {
    query += ` AND (r.name LIKE ? OR r.description_ko LIKE ? OR r.signature_menu LIKE ?)`
    const searchTerm = `%${search}%`
    params.push(searchTerm, searchTerm, searchTerm)
  }

  // 정렬 및 페이징
  query += ` ORDER BY r.featured DESC, r.rating DESC, r.id DESC`
  query += ` LIMIT ? OFFSET ?`
  params.push(parseInt(limit), parseInt(offset))

  try {
    const result = await DB.prepare(query).bind(...params).all()
    
    return c.json({
      success: true,
      data: result.results,
      total: result.results?.length || 0,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/restaurants/:id - 맛집 상세 정보
app.get('/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')

  try {
    // 맛집 기본 정보
    const restaurant = await DB.prepare(`
      SELECT 
        r.*,
        rg.name_ko as region_name,
        rg.name_en as region_name_en,
        cat.name_ko as category_name,
        cat.name_en as category_name_en,
        cat.icon as category_icon
      FROM restaurants r
      LEFT JOIN regions rg ON r.region_id = rg.id
      LEFT JOIN categories cat ON r.category_id = cat.id
      WHERE r.id = ? AND r.status = 'active'
    `).bind(id).first()

    if (!restaurant) {
      return c.json({ success: false, error: 'Restaurant not found' }, 404)
    }

    // 메뉴 정보
    const menus = await DB.prepare(`
      SELECT * FROM restaurant_menus
      WHERE restaurant_id = ? AND available = 1
      ORDER BY popular DESC, category, id
    `).bind(id).all()

    // 조회수 증가
    await DB.prepare(`
      UPDATE restaurants 
      SET view_count = view_count + 1 
      WHERE id = ?
    `).bind(id).run()

    return c.json({
      success: true,
      data: {
        ...restaurant,
        menus: menus.results || []
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/restaurants/stats - 통계 정보
app.get('/stats', async (c) => {
  const { DB } = c.env

  try {
    const stats = await DB.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN delivery_available = 1 THEN 1 ELSE 0 END) as delivery_available,
        SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) as verified,
        ROUND(AVG(rating), 2) as avg_rating
      FROM restaurants
      WHERE status = 'active'
    `).first()

    const byRegion = await DB.prepare(`
      SELECT 
        rg.name_ko as region,
        COUNT(*) as count
      FROM restaurants r
      LEFT JOIN regions rg ON r.region_id = rg.id
      WHERE r.status = 'active'
      GROUP BY r.region_id
      ORDER BY count DESC
    `).all()

    const byCategory = await DB.prepare(`
      SELECT 
        cat.name_ko as category,
        COUNT(*) as count
      FROM restaurants r
      LEFT JOIN categories cat ON r.category_id = cat.id
      WHERE r.status = 'active'
      GROUP BY r.category_id
      ORDER BY count DESC
    `).all()

    return c.json({
      success: true,
      data: {
        total: stats,
        byRegion: byRegion.results,
        byCategory: byCategory.results
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
