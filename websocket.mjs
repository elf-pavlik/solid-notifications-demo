import { WebSocket } from 'ws'
import { SubscriptionClient } from '@solid-notifications/subscription'
import { NOTIFY } from '@solid/community-server'

const topic = 'http://localhost:3000/demo/foo'
const channelType = NOTIFY.WebSocketChannel2023

// create WebSocket notification channel
const client = new SubscriptionClient(fetch)
const channel = await client.subscribe(topic, channelType)

console.log('✅ Created WebSocket channel')
console.log(channel)


// set up a WebSocket using the notification channel
const socket = new WebSocket(channel.receiveFrom)

// print all notifications, which in this case will be notifications from the topic resource

console.log('🔔 Receiving notifications')
socket.onmessage = (message) => console.log(JSON.parse(message.data));
