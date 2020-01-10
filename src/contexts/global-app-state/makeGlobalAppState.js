function makeGlobalAppState(dehydratedAppState, _app) {
  // TODO: implement makeGlobalAppState()!
  console.log("makeGlobalAppState() isn't implemented yet!")
  dehydratedAppState.setCookieConsent = _app.setCookieConsent.bind(_app)
  return dehydratedAppState
}

export default makeGlobalAppState
