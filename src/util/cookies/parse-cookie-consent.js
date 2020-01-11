function parseCookieConsent(cookieConsentString) {
  switch (cookieConsentString) {
    case "true":
      return true
    case "false":
      return false
    default:
      return null
  }
}

export default parseCookieConsent
