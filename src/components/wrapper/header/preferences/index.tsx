import Popover from "@material-ui/core/Popover"

import {
  Theme as MuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles"

import {Anchor} from "../index"

import Lang from "./lang"
import Theme from "./theme"

const useStyles = makeStyles((theme: MuiTheme) =>
  createStyles({
    popover: {
      zIndex: theme.zIndex.snackbar + 1,
    },
    paper: {
      "listStyleType": "none",
      "margin": 0,
      "padding": theme.spacing(2),
      "textAlign": "center",
      "& > li": {
        "&:not(:first-child)": {
          marginTop: theme.spacing(2),
        },
        "& > label": {
          display: "block",
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
      anchorOrigin={{horizontal: "right", vertical: "top"}}
      className={styles.popover}
      id={"preferences"}
      open={!!anchor}
      PaperProps={{className: styles.paper, component: "ul", role: "group"}}
      transformOrigin={{horizontal: "right", vertical: "top"}}
      keepMounted
      onClose={onClose}
    >
      <Lang />
      <Theme />
    </Popover>
  )
}

export default Preferences
