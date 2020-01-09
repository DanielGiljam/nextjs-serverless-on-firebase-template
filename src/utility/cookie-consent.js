import parseCookies from "utility/parse-cookies"
import serializeCookies from "utility/serialize-cookies"

export async function getCookieConsentClientSide(cookies) {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    // 1. Reading localStorage
    const local = parseCookieConsent(window.localStorage.cookieConsent)
    if (local != null) {
      console.log(
          `getCookieConsentClientSide: setting cookie consent to "${local}" based on item in localStorage.`,
      )
      return local
    }
    // 2. Reading "cookie-consent" cookie
    const cookie = parseCookieConsent(cookies["cookie-consent"])
    if (cookie != null) {
      console.log(
          `getCookieConsentClientSide: setting cookie consent to "${cookie}" based on cookie.`,
      )
      return cookie
    }
    // 3. Returning that cookie consent isn't true nor false
    return null
  } else {
    // (If environment isn't client's, throw an error)
    throw new Error(
        "getCookieConsentClientSide() was called in an environment that isn't the client's.",
    )
  }
}

export async function setCookieConsentClientSide(cookieConsent) {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    if (typeof cookieConsent !== "boolean") {
      throw new TypeError(
          "cookieConsent parameter provided to setCookieConsentClientSide() must be a boolean!",
      )
    }
    console.log(
        `setCookieConsentClientSide: setting cookie consent to "${cookieConsent}"...`,
    )
    const oldCookieConsent = parseCookieConsent(
        window.localStorage.cookieConsent,
    )
    window.localStorage.cookieConsent = cookieConsent
    console.log(
        "setCookieConsentClientSide: added cookie consent to localStorage:",
        {cookieConsent},
    )
    if (cookieConsent) {
      const cookies = parseCookies(document.cookie)
      console.log("setCookieConsentClientSide: parsed cookies:", cookies)
      cookies["cookie-consent"] = cookieConsent
      console.log(
          "setCookieConsentClientSide: adding cookie consent to parsed cookies:",
          {
            "cookie-consent": cookieConsent,
          },
      )
      const serializedCookies = (document.cookie = serializeCookies(cookies))
      console.log(
          "setCookieConsentClientSide: serialized cookies:",
          serializedCookies,
      )
    } else if (oldCookieConsent) {
      console.log("setCookieConsentClientSide: purging all existing cookies...")
      document.cookie = "" // TODO: this doesn't purge cookies. Find a working solution!
    }
  } else {
    throw new Error(
        "setCookieConsentClientSide() was called in an environment that isn't the client's.",
    )
  }
}

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
