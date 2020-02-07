import Router from "next/router"

import useGlobalAppState from "contexts/global-app-state/useGlobalAppState"
import {useEffect} from "react"

function Lang({lang, redirectUrl}) {
  useEffect(() => {
    console.log("redirectUrl:", redirectUrl)
    Router.replace(redirectUrl)
  }, [])
  return null
}

Lang.getInitialProps = async ({asPath, query}) => {
  console.log("asPath:", asPath)
  console.log("query:", query)
  return {
    lang: query.lang[0],
    redirectUrl: asPath.replace(new RegExp(`/${query.lang[0]}/?`), "/"),
  }
}

export default Lang
