export function parseCookies(cookieString) {
  const parsedCookies = {}
  const regExp = /([^=]+)=([^;,]+)(?:[;,] ?)?/g
  let array
  while ((array = regExp.exec(cookieString)) !== null) {
    parsedCookies[array[1]] = array[2]
  }
  return parsedCookies
}

export default parseCookies
