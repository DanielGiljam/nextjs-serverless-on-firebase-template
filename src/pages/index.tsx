import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
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
  let focusBackgroundExtraStrong
  if (theme.palette.type === "light") {
    restColor = blue[500]
    hoverColor = blue[800]
    hoverBackground = "transparent"
    focusBackground = "transparent"
    focusBackgroundExtraStrong = "transparent"
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
    focusBackgroundExtraStrong = color(blue[500])
        .alpha(0.2256)
        .rgb()
        .toString()
  }
  return createStyles({
    typography1: {
      padding: theme.spacing(3),
      textAlign: "center",
    },
    templateLink: {
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
    templateLinkFocusVisible: {
      "backgroundColor": focusBackground,
      "color": hoverColor,
      "outline": "unset",
      "@media(hover: none)": {
        backgroundColor: focusBackgroundExtraStrong,
      },
    },
    typography2: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: "right",
    },
    licenseLink: {
      "color": theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
    licenseLinkFocusVisible: {
      color: theme.palette.text.primary,
      outline: "unset",
    },
  })
})

function Index(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings()
  const templateLink =
    "https://github.com/DanielGiljam/nextjs-serverless-on-firebase-template"
  const licenseLink =
    "https://github.com/DanielGiljam/nextjs-serverless-on-firebase-template/blob/master/LICENSE"
  const anchor = "nextjs-serverless-on-firebase-template"
  const copyright = "© 2020 Daniel Giljam"
  const license = "MIT License"
  return (
    <>
      <Paper component={"main"}>
        <Typography className={styles.typography1} variant={"body1"}>
          {strings.thisSiteDemonstrates}
          <br />
          <Link
            classes={{focusVisible: styles.templateLinkFocusVisible}}
            className={styles.templateLink}
            href={templateLink}
            underline={"none"}
          >
            <code>{anchor}</code>
          </Link>
        </Typography>
      </Paper>
      <Typography
        className={styles.typography2}
        component={"footer"}
        variant={"body2"}
      >
        <Link
          classes={{focusVisible: styles.licenseLinkFocusVisible}}
          className={styles.licenseLink}
          href={licenseLink}
          underline={"none"}
        >
          {copyright}
          <br />
          {license}
        </Link>
      </Typography>
    </>
  )
}

export default Index
