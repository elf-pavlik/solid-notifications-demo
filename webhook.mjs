import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { SubscriptionClient } from '@solid-notifications/subscription'
import { NOTIFY, readableToString } from '@solid/community-server'

const topic = 'http://localhost:3000/demo/foo'
const channelType = NOTIFY.WebhookChannel2023

const port = 5000
const uuid = randomUUID()
const sendTo = `http://localhost:${port}/${uuid}`

// create Webhook notification channel
const client = new SubscriptionClient(fetch)
const channel = await client.subscribe(topic, channelType, sendTo)

console.log('✅ Created Webhook channel')
console.log(channel)

// create server
const server = createServer()

server.listen(port, () => {
  console.log(`👂 server started on port: ${port}` )
})

server.on('request', async(req, res) => {
  if (req.url !== `/${uuid}`) {
    res.statusCode = 404
    res.end()
    return
  }
  let body = await readableToString(req)
  console.log(JSON.parse(body))
  res.statusCode = 204
  res.end()
})
