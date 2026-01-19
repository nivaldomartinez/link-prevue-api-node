export class RateLimiter {
    state: DurableObjectState

    constructor(state: DurableObjectState) {
        this.state = state
    }

    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const key = url.searchParams.get('key')

        if (!key) {
            return new Response('Missing key', { status: 400 })
        }

        const now = Date.now()
        const windowSize = 60_000
        const maxRequests = 4

        const record = await this.state.storage.get<{ count: number; startTime: number }>(key)

        if (record) {
            if (now - record.startTime < windowSize) {
                if (record.count >= maxRequests) {
                    return new Response('Too Many Requests', { status: 429 })
                } else {
                    record.count += 1
                    await this.state.storage.put(key, record)
                }
            } else {
                await this.state.storage.put(key, { count: 1, startTime: now }) 
            }
        } else {
            await this.state.storage.put(key, { count: 1, startTime: now })
        }

        return new Response('OK', { status: 200 })
    }
}