import { Agent } from "undici"

const topic = 'http://localhost:3000/demo/foo'

const discoveryResponse = await fetch(topic, { method: 'HEAD' })

// discover receiveFrom in Link header
const linkHeader = discoveryResponse.headers.get('link')
const receiveFrom = /<([^>]+)>; rel="http:\/\/www\.w3\.org\/ns\/solid\/terms#updatesViaStreamingHttp2023"/u
  .exec(linkHeader)[1]

console.log('✅ Found notifications endpoint')
console.log(receiveFrom)

const response = await fetch(receiveFrom, {
  dispatcher: new Agent({ bodyTimeout: 0 })
})

const reader = response.body.getReader();
const decoder = new TextDecoder();

console.log('🔔 Receiving notifications')
try {
  while(true) {
    const notification = await reader.read()
      .then(({ value }) => decoder.decode(value));
    console.log(notification)
  }
} finally {
  reader.releaseLock();
  await response.body.cancel();
}
