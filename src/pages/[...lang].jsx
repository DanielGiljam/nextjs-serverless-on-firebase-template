import Router from "next/router"

import {useEffect} from "react"

function Lang({redirectUrl}) {
  useEffect(() => {
    console.log("redirectUrl:", redirectUrl)
    Router.replace(redirectUrl)
  }, [])
  return null
}

Lang.getInitialProps = async ({asPath, query}) => {
  console.log("asPath:", asPath)
  console.log("query:", query)
  return {redirectUrl: asPath.replace(new RegExp(`/${query.lang[0]}/?`), "/")}
}

export default Lang
