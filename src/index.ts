import { Hono } from 'hono'
import linkPreview from './link-preview'

const app = new Hono()

app.get('/', (c) => c.text('Link Prevue API v3.0.0'))

app.get('/preview', async (c) => {
    const uri = c.req.query('url')
    if (!uri) {
        return c.json({ error: {message: 'url is mandatory'} }, 400);
    }

    try {
        const preview = await linkPreview(uri);
        const { url, image, title, description, siteName } = preview;
        return c.json({ title, description, image, url, siteName }, 200);
    } catch (error) {
        console.error(error)
        return c.json({ error }, 400);
    }
})

export default app
