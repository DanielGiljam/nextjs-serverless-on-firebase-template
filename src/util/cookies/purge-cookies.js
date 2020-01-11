function purgeCookies(cookies) {
  const cookieKeys = Object.keys(cookies)
  if (cookieKeys.length) {
    const expiryDate = new Date(0).toUTCString()
    for (const cookieKey of cookieKeys) {
      document.cookie = `${cookieKey}=${cookies[cookieKey]};expires=${expiryDate}`
    }
    console.log("purgeCookies: cookies that were purged:", cookies)
  }
}

export default purgeCookies
