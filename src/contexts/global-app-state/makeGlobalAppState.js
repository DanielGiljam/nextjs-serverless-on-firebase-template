function makeGlobalAppState(dehydratedAppState, _app) {
  dehydratedAppState.setTheme = _app.setTheme.bind(_app)
  dehydratedAppState.setCookieConsent = _app.setCookieConsent.bind(_app)
  return dehydratedAppState
}

export default makeGlobalAppState
