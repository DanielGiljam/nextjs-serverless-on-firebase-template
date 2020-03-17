import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"

import color from "color"

export default makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      flexGrow: 1,
    },
    link: {
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
    linkFocusVisible: {
      color: theme.palette.text.primary,
      outline: "unset",
    },
    iconButton: {
      "color": color(theme.palette.text.secondary)
          .fade(0.1875)
          .rgb()
          .toString(),
      "marginRight": theme.spacing(-0.75),
      "padding": theme.spacing(0.75),
      "&:hover": {
        backgroundColor: "unset",
        color: theme.palette.text.secondary,
      },
    },
    iconButtonFocusVisible: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.secondary,
    },
  }),
)
