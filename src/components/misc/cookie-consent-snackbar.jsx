import PropTypes from "prop-types"

import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"

import useStrings from "contexts/strings/useStrings"

function CookieConsentSnackbar({show, setCookieConsent}) {
  const strings = useStrings()
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={show}
      message={strings.cookieConsentSnackbar.message}
      action={
        <>
          <Button
            color="secondary"
            size="small"
            onClick={() => setCookieConsent(true)}
          >
            {strings.cookieConsentSnackbar.yes}
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={() => setCookieConsent(false)}
          >
            {strings.cookieConsentSnackbar.no}
          </Button>
        </>
      }
    />
  )
}

CookieConsentSnackbar.propTypes = {
  show: PropTypes.bool.isRequired,
  setCookieConsent: PropTypes.func.isRequired,
}

export default CookieConsentSnackbar
