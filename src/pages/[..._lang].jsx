import Router from "next/router"

import {useEffect} from "react"

function Lang({redirectUrl, redirectAs, lang}) {
  useEffect(() => {
    Router.replace(redirectUrl, redirectAs)
  }, [])
  return null
}

Lang.getInitialProps = async ({asPath, query}) => {
  const lang = Array.isArray(query._lang) ? query._lang[0] : query._lang
  const as = asPath.replace(new RegExp(`/${lang}/?`), "/")
  const url = as.replace(
      /(?:\?[^/]*)?$/,
      (match) => `${match || "?"}&lang=${lang}`,
  )
  return {
    redirectUrl: url,
    redirectAs: as,
    lang,
  }
}

export default Lang
