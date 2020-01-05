const functions = require("firebase-functions")

const index = require("../../.next/serverless/pages/index")

module.exports = {
  next: {
    index: functions.https.onRequest(index.render),
  },
}
