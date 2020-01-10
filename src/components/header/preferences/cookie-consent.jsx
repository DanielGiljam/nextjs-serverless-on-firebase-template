import PropTypes from "prop-types"

import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Button from "@material-ui/core/Button"

import useStrings from "contexts/strings/useStrings"

function CookieConsent({cookieConsent, setCookieConsent}) {
  const strings = useStrings().header.preferences.cookieConsent
  return (
    <>
      {/* TODO: this layout is broken. Make another layout! */}
      <ListItemText
        primary={strings.label}
        secondary={strings.state[cookieConsent ? "positive" : "negative"]}
      />
      <ListItemSecondaryAction>
        <Button onClick={() => setCookieConsent(!cookieConsent)}>
          {strings.action[cookieConsent ? "negative" : "positive"]}
        </Button>
      </ListItemSecondaryAction>
    </>
  )
}

CookieConsent.propTypes = {
  cookieConsent: PropTypes.bool,
  setCookieConsent: PropTypes.func.isRequired,
}

export default CookieConsent
