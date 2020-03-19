import Popover from "@material-ui/core/Popover"

import {
  Theme as MuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles"

import {Anchor} from "../index"

import CookieConsent from "./cookie-consent"
import Lang from "./lang"
import Theme from "./theme"

const useStyles = makeStyles((theme: MuiTheme) =>
  createStyles({
    paper: {
      "display": "flex",
      "flexDirection": "column",
      "margin": 0,
      "padding": theme.spacing(1),
      "& > li": {
        "marginTop": theme.spacing(1),
        "& > label": {
          display: "block",
          lineHeight: 1,
        },
        "& > :last-child": {
          marginTop: theme.spacing(1),
        },
      },
    },
  }),
)

interface PreferencesProps {
  anchor: Anchor;
  setAnchor: (anchor: Anchor) => void;
}

function Preferences({anchor, setAnchor}: PreferencesProps): JSX.Element {
  const styles = useStyles()
  function onClose(): void {
    setAnchor(undefined)
  }
  return (
    <Popover
      anchorEl={anchor}
      id={"preferences"}
      open={!!anchor}
      PaperProps={{className: styles.paper, component: "ul", role: "group"}}
      transformOrigin={{horizontal: "right", vertical: "top"}}
      keepMounted
      onClose={onClose}
    >
      <Lang />
      <Theme />
      <CookieConsent />
    </Popover>
  )
}

export default Preferences
