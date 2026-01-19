import { Hono } from 'hono'
import { cors } from 'hono/cors'
import linkPreview from './link-preview'
import { rateLimiterMiddleware } from './middlewares/rate-limiter.middleware'
import { RateLimiter } from './durable-objects/rate-limiter'

type Bindings = {
  RATE_LIMITER: DurableObjectNamespace
}

const app = new Hono<{Bindings: Bindings}>()

app.use('*', cors())
app.get('/', (c) => c.text('Link Prevue API'))

app.get('/preview', rateLimiterMiddleware, async (c) => {
    const uri = c.req.query('url')
    if (!uri) {
        return c.json({ error: {message: 'url is mandatory'} }, 400)
    }

    try {
        const preview = await linkPreview(uri);
        const { url, image, title, description, siteName } = preview;
        return c.json({ title, description, image, url, siteName }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error }, 400)
    }
})

export default app
export { RateLimiter }
