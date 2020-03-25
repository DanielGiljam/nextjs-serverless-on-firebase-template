import {ReactNode, useEffect} from "react"

import Container from "@material-ui/core/Container"

import CookieConsentSnackbar from "./cookie-consent-snackbar"
import Header from "./header"

function Wrapper({children}: {children: ReactNode}): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])
  return (
    <>
      <Container maxWidth={"sm"}>
        <Header />
        {children}
      </Container>
      <CookieConsentSnackbar />
    </>
  )
}

export default Wrapper
