import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// GET /api/regions - 모든 지역 목록
app.get('/', async (c) => {
  const { DB } = c.env

  try {
    const result = await DB.prepare(`
      SELECT * FROM regions
      ORDER BY province, id
    `).all()

    return c.json({
      success: true,
      data: result.results
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/regions/provinces - 도 단위 목록
app.get('/provinces', async (c) => {
  const { DB } = c.env

  try {
    const result = await DB.prepare(`
      SELECT DISTINCT province FROM regions
      ORDER BY province
    `).all()

    return c.json({
      success: true,
      data: result.results
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
