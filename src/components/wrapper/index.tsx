import {ReactNode, useEffect} from "react"

import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"

import Header from "./header"
import CookieConsentSnackbar from "./cookie-consent-snackbar"

function Wrapper({children}: {children: ReactNode}): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])
  return (
    <>
      <Container maxWidth={"sm"}>
        <Header />
        <Paper component={"main"}>{children}</Paper>
      </Container>
      <CookieConsentSnackbar />
    </>
  )
}

export default Wrapper
