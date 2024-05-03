# Real Time Solid @ Solid Symposium 2024


* [Community Solid Server - Notifications documentation](https://communitysolidserver.github.io/CommunitySolidServer/latest/usage/notifications/)
* [Notifications Client README](https://github.com/o-development/solid-notification-client?tab=readme-ov-file#solid-notification-client)

Authentication will not be used in this simple demo.
If you would like to experiment with it, the account associated with the `demo` storage uses email `alice@example.org` and password `password`.


This demo will require running CSS locally.
```bash
npm install
```

```bash
npm start
```

An update on the example resource can be triggered with

```bash
curl -X PUT http://localhost:3000/demo/foo -H "Content-Type: text/plain" -d "🚶 Walk 🚶"
```

## WebSocket

The WebSocket demo can be run with

```bash
node websocket.mjs
```

It will print out the created notification channel and every notification.

## Streaming HTTP

The Streaming HTTP demo can be run with `curl`.
First, we need to discover the `receiveFrom` URL. It is advertised in the `Link` HTTP header of the response using `rel="http://www.w3.org/ns/solid/terms#updatesViaStreamingHttp2023"`.

```bash
curl -I http://localhost:3000/demo/foo
```
Now, we can simply make a request

```bash
curl http://localhost:3000/.notifications/StreamingHTTPChannel2023/demo/foo
```

and see notifications whenever the topic resource gets updated.

The Javasctipt Streaming HTTP demo can be run with

```bash
node streaming-http.mjs
```

It will print out the created notification channel and every notification.

## Webhook

The Webhook demo can be run with

```bash
node webhook.mjs
```

It will print out the created notification channel and every notification.
