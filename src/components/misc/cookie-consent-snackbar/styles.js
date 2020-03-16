import makeStyles from "@material-ui/core/styles/makeStyles"

import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"

import color from "color"

function styles(theme) {
  return {
    buttonPositive: {
      "color": green[800],
      "&:hover": {
        backgroundColor: color(green[800])
            .alpha(theme.palette.action.hoverOpacity)
            .rgb()
            .string(),
      },
    },
    buttonNegative: {
      "color": red[800],
      "&:hover": {
        backgroundColor: color(red[800])
            .alpha(theme.palette.action.hoverOpacity)
            .rgb()
            .string(),
      },
    },
  }
}

export default makeStyles(styles)
