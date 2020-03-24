import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"

import blue from "@material-ui/core/colors/blue"

import color from "color"

import useStrings from "nextjs-global-app-state/useStrings"

const useStyles = makeStyles((theme: Theme) => {
  let restColor
  let hoverColor
  let hoverBackground
  let focusBackground
  let focusVisibleBackground
  if (theme.palette.type === "light") {
    restColor = blue[500]
    hoverColor = blue[800]
    hoverBackground = "transparent"
    focusBackground = "transparent"
    focusVisibleBackground = "transparent"
  } else {
    restColor = blue[100]
    hoverColor = blue[100]
    hoverBackground = color(blue[500])
        .alpha(theme.palette.action.hoverOpacity)
        .rgb()
        .toString()
    focusBackground = color(blue[500])
        .alpha(0.12)
        .rgb()
        .toString()
    focusVisibleBackground = color(blue[500])
        .alpha(0.2256)
        .rgb()
        .toString()
  }
  return createStyles({
    typography: {
      padding: theme.spacing(3),
      textAlign: "center",
    },
    link: {
      "borderRadius": theme.shape.borderRadius,
      "color": restColor,
      "paddingLeft": theme.spacing(0.5),
      "paddingRight": theme.spacing(0.5),
      "& > code": {
        fontFamily: ["Lucida Console", "Monaco", "monospace"],
      },
      "&:hover": {
        backgroundColor: hoverBackground,
        color: hoverColor,
      },
      "@media(hover: none)": {
        backgroundColor: focusBackground,
      },
    },
    linkFocusVisible: {
      backgroundColor: focusVisibleBackground,
      color: hoverColor,
      outline: "unset",
    },
  })
})

function Index(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings().index
  const href =
    "https://github.com/DanielGiljam/nextjs-serverless-on-firebase-template"
  const anchor = "nextjs-serverless-on-firebase-template"
  return (
    <Typography className={styles.typography} variant={"body1"}>
      {strings.text}
      <br />
      <Link
        classes={{focusVisible: styles.linkFocusVisible}}
        className={styles.link}
        href={href}
        underline={"none"}
      >
        <code>{anchor}</code>
      </Link>
    </Typography>
  )
}

export default Index
