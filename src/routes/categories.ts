import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// GET /api/categories - 모든 카테고리 목록
app.get('/', async (c) => {
  const { DB } = c.env

  try {
    const result = await DB.prepare(`
      SELECT * FROM categories
      ORDER BY id
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
