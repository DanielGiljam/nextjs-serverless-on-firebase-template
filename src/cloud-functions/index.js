/* eslint-disable @typescript-eslint/no-var-requires */

const functions = require("firebase-functions")

const lang = require("../../.next/serverless/pages/[..._lang]")
const about = require("../../.next/serverless/pages/about")
const example = require("../../.next/serverless/pages/example/[index]")
const index = require("../../.next/serverless/pages/index")

module.exports = {
  next: {
    index: functions.https.onRequest(index.render),
    about: functions.https.onRequest(about.render),
    example: functions.https.onRequest(example.render),
    lang: functions.https.onRequest(lang.render),
    serverless: {
      index: functions.https.onRequest(index.render),
      about: functions.https.onRequest(about.render),
    },
  },
}
