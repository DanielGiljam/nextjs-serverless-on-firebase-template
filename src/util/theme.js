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