const functions = require("firebase-functions")
const next = require("next")

const app = next({})
const handle = app.getRequestHandler()

module.exports = {
  next: {
    server: functions.https.onRequest((req, res) => {
      app.prepare().then(() => handle(req, res))
    }),
  },
}
