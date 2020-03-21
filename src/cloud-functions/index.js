/* eslint-disable @typescript-eslint/no-var-requires */

const functions = require("firebase-functions")

const lang = require("../../.next/serverless/pages/[..._lang]")
const index = require("../../.next/serverless/pages/index")

module.exports = {
  next: {
    index: functions.https.onRequest(index.render),
    lang: functions.https.onRequest(lang.render),
  },
}
