import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Button from "@material-ui/core/Button"

import useStrings from "resources/strings/useStrings"
import {useEffect, useState} from "react"

import {
  getCookieConsentClientSide,
  setCookieConsentClientSide,
} from "utility/cookie-consent"

import parseCookies from "utility/parse-cookies"

function CookieConsent() {
  const strings = useStrings().header.preferences.cookieConsent
  const [cookieConsent, setCookieConsent] = useState(false)
  useEffect(() => {
    getCookieConsentClientSide(parseCookies(document.cookie))
        .then((cookieConsent) => {
          if (cookieConsent) setCookieConsent(cookieConsent)
        })
        .catch((error) => console.error(error.stack))
  }, [])
  function setCookieConsentPositive() {
    setCookieConsentClientSide(true)
        .then(() => setCookieConsent(true))
        .catch((error) => console.error(error.stack))
  }
  function setCookieConsentNegative() {
    setCookieConsentClientSide(false)
        .then(() => setCookieConsent(false))
        .catch((error) => console.error(error.stack))
  }
  return (
    <>
      <ListItemText
        primary={strings.label}
        secondary={
          cookieConsent ? strings.state.positive : strings.state.negative
        }
      />
      <ListItemSecondaryAction>
        <Button
          onClick={
            cookieConsent ? setCookieConsentNegative : setCookieConsentPositive
          }
        >
          {cookieConsent ? strings.action.negative : strings.action.positive}
        </Button>
      </ListItemSecondaryAction>
    </>
  )
}

export default CookieConsent
