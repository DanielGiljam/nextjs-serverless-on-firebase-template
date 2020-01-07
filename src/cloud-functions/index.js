const functions = require("firebase-functions")

const index = require("../../.next/serverless/pages/index")
const about = require("../../.next/serverless/pages/about")

module.exports = {
  next: {
    index: functions.https.onRequest(index.render),
    about: functions.https.onRequest(about.render),
    serverless: {
      index: functions.https.onRequest(index.render),
      about: functions.https.onRequest(about.render),
    },
  },
}
