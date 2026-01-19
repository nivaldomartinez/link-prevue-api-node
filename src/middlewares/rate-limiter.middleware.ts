import { MiddlewareHandler } from "hono";

export const rateLimiterMiddleware: MiddlewareHandler = async (ctx, next) => {
    const ip = ctx.req.header('CF-Connecting-IP') || 'unknown'
    const url = ctx.req.query('url')

    if (!url) {
        return ctx.json({ error: { message: 'Missing url param' } }, 400)
    }

    const key = `${ip}:${url}`

    const id = ctx.env.RATE_LIMITER.idFromName(key)
    const stub = ctx.env.RATE_LIMITER.get(id)

    const res = await stub.fetch(`https://rate-limit/check?key=${encodeURIComponent(key)}`)

    if (res.status === 429) {
        return ctx.json({ error: { message: 'Rate limit exceeded' } }, 429)
    }

    await next();
}