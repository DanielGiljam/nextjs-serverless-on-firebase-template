import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"

import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"

import color from "color"

import useGlobalAppState from "nextjs-global-app-state-strict-demo/useGlobalAppState"
import useStrings from "nextjs-global-app-state-strict-demo/useStrings"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helperText: {
      maxWidth: 240,
    },
    group: {
      paddingTop: theme.spacing(0.75),
      paddingBottom: theme.spacing(0.75),
    },
    buttonPositive: {
      "borderColor": green[500],
      "color": green[500],
      "&:hover": {
        backgroundColor: color(green[500])
            .alpha(theme.palette.action.hoverOpacity)
            .rgb()
            .string(),
      },
    },
    buttonNegative: {
      "marginLeft": theme.spacing(1),
      "borderColor": red[500],
      "color": red[500],
      "&:hover": {
        backgroundColor: color(red[500])
            .alpha(theme.palette.action.hoverOpacity)
            .rgb()
            .string(),
      },
    },
  }),
)

function CookieConsent(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings().header.preferences.cookieConsent
  const {cookieConsent, setCookieConsent} = useGlobalAppState()
  function giveCookieConsent(): void {
    setCookieConsent(true)
  }
  function revokeCookieConsent(): void {
    setCookieConsent(false)
  }
  return (
    <li>
      <Typography component={"label"} id={"cookies"} variant={"body1"}>
        {strings.label}
      </Typography>
      <Typography
        className={styles.helperText}
        color={"textSecondary"}
        component={"p"}
        variant={"caption"}
      >
        {strings.state[cookieConsent ? "positive" : "negative"]}
      </Typography>
      <div aria-labelledby={"cookies"} className={styles.group} role={"group"}>
        <Button
          aria-label={strings.action.positive}
          className={styles.buttonPositive}
          disabled={cookieConsent}
          variant={"outlined"}
          onClick={giveCookieConsent}
        >
          {strings.action.positive}
        </Button>
        <Button
          aria-label={strings.action.negative}
          className={styles.buttonNegative}
          disabled={cookieConsent === false}
          variant={"outlined"}
          onClick={revokeCookieConsent}
        >
          {strings.action.negative}
        </Button>
      </div>
    </li>
  )
}

export default CookieConsent
