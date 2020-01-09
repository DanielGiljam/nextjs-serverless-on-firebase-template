function serializeCookies(cookies) {
  const cookieNames = Object.keys(cookies)
  return cookieNames.reduce(
      (accumulator, currentValue, index) =>
      index ?
        accumulator + `; ${currentValue}=${cookies[currentValue]}` :
        accumulator,
      `${cookieNames[0]}=${cookies[cookieNames[0]]}`,
  )
}

export default serializeCookies
