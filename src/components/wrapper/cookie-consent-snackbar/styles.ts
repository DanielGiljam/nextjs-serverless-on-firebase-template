import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"

import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"

import color from "color"

export default makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      [theme.breakpoints.up("sm")]: {
        maxWidth: 400,
      },
    },
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
  }),
)
