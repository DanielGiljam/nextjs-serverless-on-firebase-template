import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import color from "color"

import useStrings from "nextjs-global-app-state/useStrings"
import useGlobalAppState from "nextjs-global-app-state/useGlobalAppState"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonPositive: {
      "color": green[500],
      "&:hover": {
        backgroundColor: color(green[500])
            .alpha(theme.palette.action.hoverOpacity)
            .rgb()
            .string(),
      },
    },
    buttonNegative: {
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
  return (
    <li>
      <Typography component={"label"} id={"cookie consent"} variant={"body1"}>
        {strings.label}
      </Typography>
      <Typography color={"textSecondary"} component={"p"} variant={"caption"}>
        {strings.state[cookieConsent ? "positive" : "negative"]}
      </Typography>
      <Button
        aria-label={
          cookieConsent ?
            "revoke consent to cookies" :
            "give consent to cookies"
        }
        className={styles[cookieConsent ? "buttonNegative" : "buttonPositive"]}
        onClick={(): void => setCookieConsent(!cookieConsent)}
      >
        {strings.action[cookieConsent ? "negative" : "positive"]}
      </Button>
    </li>
  )
}

export default CookieConsent
