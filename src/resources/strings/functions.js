import Cookies from "js-cookie"

export async function getLangServerSide(cookies, acceptLanguageHeader) {
  const supportedLanguages = (
    await fetch(`${process.env.ASSET_PREFIX}/data.json`).then((res) =>
      res.json(),
    )
  ).languages
  console.log("getLangServerSide: supported languages:", supportedLanguages)
  if (cookies && cookies.lang) {
    console.log("getLangServerSide: found a language cookie:", {
      lang: cookies.lang,
    })
    const lang = cookies.lang.slice(0, 2) // e.g. "en-US" --> "en"
    if (supportedLanguages.includes(lang)) return lang
    else console.log("getLangServerSide: the cookie was invalid.")
  } else console.log("getLangServerSide: found no language cookie.")
  if (acceptLanguageHeader) {
    const acceptedLanguages = parseAcceptLanguageHeader(acceptLanguageHeader)
    console.log(
        "getLangServerSide: proceeding with parsing the \"Accept-Language\" header:",
        acceptLanguageHeader,
    )
    console.log("getLangServerSide: accepted languages:", acceptedLanguages)
    for (const {lang} of acceptedLanguages) {
      if (supportedLanguages.includes(lang)) return lang
    }
    console.log("getLangServerSide: no accepted language is supported.")
  } else console.log("getLangServerSide: found no \"Accept-Language\" header.")
  console.log("getLangServerSide: falling back to:", {lang: "en"})
  return "en"
}

export async function getLangClientSide() {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    // 1. Reading localStorage
    const local = window.localStorage.lang
    if (local) {
      console.log(
          `getLangClientSide: setting language to "${local}" based on item in localStorage.`,
      )
      return local
    }
    // 2. Reading sessionStorage
    const session = window.sessionStorage.lang
    if (session) {
      console.log(
          `getLangClientSide: setting language to "${session}" based on item in sessionStorage.`,
      )
      return session
    }
    // (Fetching a list of supported languages to check against, as the following sources may specify unsupported languages)
    const supportedLanguages = (
      await fetch(`${process.env.ASSET_PREFIX}/data.json`).then((res) =>
        res.json(),
      )
    ).languages
    let lang = "en"
    let cookie
    let browserPreference
    // 3. Reading "lang" cookie
    if (
      (cookie = Cookies.get("lang")) !== null &&
      supportedLanguages.includes(cookie.slice(0, 2))
    ) {
      console.log(
          `getLangClientSide: setting language to "${cookie}" based on cookie.`,
      )
      lang = cookie
    }
    // 3. Reading browser's language preferences
    else if (
      (browserPreference = navigator.languages.find((lang) =>
        supportedLanguages.includes(lang.slice(0, 2)),
      )) !== null
    ) {
      // e.g. "en-US" --> "en"
      console.log(
          `getLangClientSide: setting language to "${browserPreference}" based on client's browser's language preference.`,
      )
      lang = browserPreference
    }
    // 4. Falling back to default language ("en")
    else {
      console.log(
          "getLangClientSide: setting language to \"en\" based on nothing.",
      )
    }
    // (Returning the result + populating sessionStorage.lang with the result)
    console.log(
        `getLangClientSide: populating window.sessionStorage.lang with "${lang}".`,
    )
    window.sessionStorage.lang = lang
    return lang
  } else {
    // (If environment isn't client's, falling back to default language ("en") and returning that)
    console.log(
        "getLangClientSide: environment not client's. Setting language to \"en\".",
    )
    return "en"
  }
}

export function extendStringClass() {
  Object.defineProperties(String, {
    format: {configurable: true, value: format, writable: true},
  })
  Object.defineProperties(String.prototype, {
    ucFirst: {configurable: true, value: ucFirst, writable: true},
    lcFirst: {configurable: true, value: lcFirst, writable: true},
    capitalize: {configurable: true, value: capitalize, writable: true},
  })
}

function parseAcceptLanguageHeader(acceptLanguageHeader) {
  const parsedAcceptLanguagesHeader = []
  const regExp = /([^-,;]+)(?:-([^-,;]+(?:-[^-,;]+)*))?(?:;q=(\d(?:\.\d+)?))?,?/g
  let array
  while ((array = regExp.exec(acceptLanguageHeader)) !== null) {
    parsedAcceptLanguagesHeader.push({
      lang: array[1],
      flavor: array[2],
      q: array[3],
    })
  }
  return parsedAcceptLanguagesHeader
}

function format(template, ...substitutions) {
  let formattedString = template
  for (const substitution of substitutions) {
    const newFormattedString = formattedString.replace(
        /([^\\])%s/,
        `\$1${substitution}`,
    )
    if (formattedString === newFormattedString) {
      console.error(
          "String.format() was called with too many arguments. " +
          `Template: "${template}". substitutions: ${substitutions.reduce(
              (accumulator, currentValue) => accumulator + `, "${currentValue}"`,
              `"${substitutions[0]}"`,
          )}.`,
      )
    }
    formattedString = newFormattedString
  }
  return formattedString
}

function ucFirst() {
  return this.replace(/^./, (match) => match.toUpperCase())
}

function lcFirst() {
  return this.replace(/^./, (match) => match.toLowerCase())
}

function capitalize(lang) {
  // TODO: write capitalize() -function!
}
