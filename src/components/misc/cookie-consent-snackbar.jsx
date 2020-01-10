import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"

import useStrings from "contexts/strings/useStrings"
import useGlobalAppState from "contexts/global-app-state/useGlobalAppState"

function CookieConsentSnackbar() {
  const strings = useStrings().cookieConsentSnackbar
  const {cookieConsent, setCookieConsent} = useGlobalAppState()
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={cookieConsent == null}
      message={strings.message}
      action={
        <>
          <Button
            color="secondary"
            size="small"
            onClick={() => setCookieConsent(true)}
          >
            {strings.yes}
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={() => setCookieConsent(false)}
          >
            {strings.no}
          </Button>
        </>
      }
    />
  )
}

export default CookieConsentSnackbar
