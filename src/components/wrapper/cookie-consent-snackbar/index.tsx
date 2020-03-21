import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"

import useGlobalAppState from "nextjs-global-app-state-strict-demo/useGlobalAppState"
import useStrings from "nextjs-global-app-state-strict-demo/useStrings"

import useStyles from "./styles"

function CookieConsentSnackbar(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings().cookieConsentSnackbar
  const {cookieConsent, setCookieConsent} = useGlobalAppState()
  return (
    <Snackbar
      action={
        <>
          <Button
            className={styles.buttonPositive}
            onClick={(): void => setCookieConsent(true)}
          >
            {strings.yes}
          </Button>
          <Button
            className={styles.buttonNegative}
            onClick={(): void => setCookieConsent(false)}
          >
            {strings.no}
          </Button>
        </>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      className={styles.snackbar}
      message={strings.message}
      open={cookieConsent == null}
    />
  )
}

export default CookieConsentSnackbar
