import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// GET /api/festivals - 축제 목록
app.get('/', async (c) => {
  const { DB } = c.env
  const { region, category, month, limit = '30', offset = '0' } = c.req.query()

  let query = `
    SELECT 
      f.*,
      r.name_ko as region_name
    FROM festivals f
    LEFT JOIN regions r ON f.region_id = r.id
    WHERE f.status = 'active'
  `
  const params: any[] = []

  // 지역 필터
  if (region) {
    query += ` AND f.region_id = ?`
    params.push(region)
  }

  // 카테고리 필터
  if (category) {
    query += ` AND f.category = ?`
    params.push(category)
  }

  // 월별 필터
  if (month) {
    query += ` AND (
      strftime('%m', f.start_date) = ? OR 
      strftime('%m', f.end_date) = ?
    )`
    params.push(month.padStart(2, '0'), month.padStart(2, '0'))
  }

  query += ` ORDER BY f.start_date ASC LIMIT ? OFFSET ?`
  params.push(parseInt(limit), parseInt(offset))

  try {
    const result = await DB.prepare(query).bind(...params).all()
    
    return c.json({
      success: true,
      data: result.results,
      total: result.results?.length || 0
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/festivals/:id - 축제 상세
app.get('/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')

  try {
    const festival = await DB.prepare(`
      SELECT 
        f.*,
        r.name_ko as region_name,
        r.name_en as region_name_en
      FROM festivals f
      LEFT JOIN regions r ON f.region_id = r.id
      WHERE f.id = ? AND f.status = 'active'
    `).bind(id).first()

    if (!festival) {
      return c.json({ 
        success: false, 
        error: 'Festival not found' 
      }, 404)
    }

    return c.json({
      success: true,
      data: festival
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
