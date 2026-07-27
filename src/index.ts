import { serve } from '@hono/node-server'
import app from './app.js'

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001

serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app
