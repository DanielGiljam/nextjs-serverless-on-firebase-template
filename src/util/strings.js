export async function getLangServerSide(supportedLanguages, cookies, acceptLanguageHeader) {
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

export async function getLangClientSide(cookies) {
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
      (cookie = cookies.lang) != null &&
      supportedLanguages.includes(cookie.slice(0, 2))
    ) {
      console.log(
          `getLangClientSide: setting language to "${cookie}" based on cookie.`,
      )
      lang = cookie.slice(0, 2)
    }
    // 3. Reading browser's language preferences
    else if (
      (browserPreference = navigator.languages.find((lang) =>
        supportedLanguages.includes(lang.slice(0, 2)),
      )) != null
    ) {
      // e.g. "en-US" --> "en"
      console.log(
          `getLangClientSide: setting language to "${browserPreference}" based on client's browser's language preference.`,
      )
      lang = browserPreference.slice(0, 2)
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
    // (If environment isn't client's, throw an error)
    throw new Error(
        "getLangClientSide() was called in an environment that isn't the client's.",
    )
  }
}

export function extendStringClass() {
  Object.defineProperties(String, {
    format: {configurable: true, value: format, writable: true},
  })
  // eslint-disable-next-line no-extend-native
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
  const regExp = /([^\\])%s/
  let formattedString = template
  for (const substitution of substitutions) {
    const newFormattedString = formattedString.replace(
        regExp,
        `$1${substitution}`,
    )
    if (formattedString === newFormattedString) {
      console.error(
          "String.format() was called with too many arguments. " +
          `Template: "${template}". substitutions: ${substitutions.reduce(
              (accumulator, currentValue, index) =>
              index ? accumulator + `, "${currentValue}"` : accumulator,
              `"${substitutions[0]}"`,
          )}.`,
      )
    }
    formattedString = newFormattedString
  }
  if (regExp.test(formattedString)) {
    throw new Error(
        "String.format() was called with too few arguments. " +
        `Template: "${template}". substitutions: ${substitutions.reduce(
            (accumulator, currentValue, index) =>
            index ? accumulator + `, "${currentValue}"` : accumulator,
            `"${substitutions[0]}"`,
        )}.`,
    )
  }
  return formattedString
}

function ucFirst() {
  // eslint-disable-next-line no-invalid-this
  return this.replace(/^./, (match) => match.toUpperCase())
}

function lcFirst() {
  // eslint-disable-next-line no-invalid-this
  return this.replace(/^./, (match) => match.toLowerCase())
}

function capitalize(lang) {
  // TODO: write capitalize() -function!
}
