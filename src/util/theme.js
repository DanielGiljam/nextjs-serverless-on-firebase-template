export async function getThemeTypeServerSide(supportedThemeTypes, cookies) {
  console.log(
      "getThemeTypeServerSide: supported theme types:",
      supportedThemeTypes,
  )
  if (cookies && cookies["theme-type"]) {
    console.log("getThemeTypeServerSide: found a theme type cookie:", {
      "theme-type": cookies["theme-type"],
    })
    if (supportedThemeTypes.includes(cookies["theme-type"])) {
      return cookies["theme-type"]
    } else console.log("getThemeTypeServerSide: the cookie was invalid.")
  } else console.log("getThemeTypeServerSide: found no theme type cookie.")
  console.log("getThemeTypeServerSide: falling back to:", {
    "theme-type": "light",
  })
  return "light"
}

export async function getThemeTypeClientSide() {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    // 1. Reading localStorage
    const local = window.localStorage.lang
    if (local) {
      console.log(
          `getThemeTypeClientSide: setting theme type to "${local}" based on item in localStorage.`,
      )
      return local
    }
    // 3. Returning theme type "auto" if no theme type was explicitly specified in localStorage
    console.log(
        "getThemeTypeClientSide: setting theme type to \"auto\" based on item in localStorage.",
    )
    return "auto"
  } else {
    // (If environment isn't client's, throw an error)
    throw new Error(
        "getThemeTypeClientSide() was called in an environment that isn't the client's.",
    )
  }
}

export function getThemeTypeAuto() {
  if (typeof window !== "undefined") {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      console.log(
          "getThemeTypeAuto: setting theme type to \"light\" based on client's browser's preference.",
      )
      return "light"
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log(
          "getThemeTypeAuto: setting theme type to \"dark\" based on client's browser's preference.",
      )
      return "dark"
    }
  }
  // TODO: determine theme based on sunrise/sunset times!
  return "light"
}
