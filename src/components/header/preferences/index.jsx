import PropTypes from "prop-types"

import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import CookieConsent from "./cookie-consent"

function Preferences({anchor, setAnchor}) {
  return (
    <Menu
      id={"preferences"}
      open={!!anchor}
      onClose={() => setAnchor(null)}
      anchorEl={anchor}
      keepMounted
    >
      <MenuItem>
        <CookieConsent />
      </MenuItem>
    </Menu>
  )
}

Preferences.propTypes = {
  anchor: PropTypes.any,
  setAnchor: PropTypes.func.isRequired,
}

export default Preferences
