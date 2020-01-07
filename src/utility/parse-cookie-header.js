function parseCookieHeader(cookieHeader) {
  const parsedCookieHeader = {}
  const regExp = /([^=]+)=([^;]+)(?:; )?/g
  let array
  while ((array = regExp.exec(cookieHeader)) !== null) {
    parsedCookieHeader[array[1]] = array[2]
  }
  return parsedCookieHeader
}

export default parseCookieHeader
