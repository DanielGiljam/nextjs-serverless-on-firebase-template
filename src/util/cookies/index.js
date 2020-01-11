import setCookie from "./set-cookie"
import parseCookies from "./parse-cookies"
import parseCookieConsent from "./parse-cookie-consent"
import purgeCookies from "./purge-cookies"

export async function getCookieConsentServerSide(cookies) {
  return cookies["cookie-consent"] === "true"
}

export async function getCookieConsentClientSide() {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    // 1. Reading localStorage
    const local = parseCookieConsent(window.localStorage.cookieConsent)
    if (local != null) {
      console.log(
          `getCookieConsentClientSide: setting cookie consent to "${local}" based on item in localStorage.`,
      )
      return local
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

export async function setCookieConsent(cookieConsent) {
  if (typeof cookieConsent !== "boolean") {
    throw new TypeError(
        "cookieConsent parameter provided to setCookieConsent() must be a boolean!",
    )
  }
  console.log(
      `setCookieConsent: setting cookie consent to "${cookieConsent}"...`,
  )
  window.localStorage.cookieConsent = cookieConsent
  console.log("setCookieConsent: added cookie consent to localStorage:", {
    cookieConsent: cookieConsent.toString(),
  })
}

export async function setCookies(cookies) {
  console.log("setCookies: cookies that will be set:", cookies)
  const existingCookies = parseCookies(document.cookie)
  console.log("setCookies: existing cookies:", {
    existingCookies: document.cookie,
  })
  let cookieValue
  let existingCookieValue
  for (const cookieKey of Object.keys(cookies)) {
    // If a key exists in both existingCookies and in the cookies-object
    // that was passed as an argument to this function, but the values don't match,
    // then the corresponding cookie is reset with the value in the cookies-object.
    // An appropriate message is logged about that.
    if (
      (cookieValue = cookies[cookieKey]) !==
      (existingCookieValue = existingCookies[cookieKey])
    ) {
      if (existingCookieValue) {
        console.log(
            `setCookies: key "${cookieKey}" will be set from value "${existingCookieValue}" to value "${cookieValue}".`,
        )
      } else {
        console.log(
            `setCookies: key "${cookieKey}" will be set to value "${cookieValue}".`,
        )
      }
      setCookie(cookieKey, cookieValue)
    }
    // Deleting every key in existingCookies that is also in the cookies-object
    // that was passed as an argument to this function. This way existingCookies
    // is virtually "remainingCookies" by the end of this loop.
    if (!delete existingCookies[cookieKey]) {
      // If a key deletion is unsuccessful, a warning is logged about that.
      console.warn(
          `setCookies: failed in operating on cookie "${cookieKey}"! As a result, it will be unset. Sorry!`,
      )
    }
  }
  // Purging all "cookies" that still remain in existingCookies
  purgeCookies(existingCookies)
  console.log("setCookies: resulting cookies:", {
    resultingCookies: document.cookie,
  })
}
