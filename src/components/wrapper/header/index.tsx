import Head from "next/head"
import NextLink from "next/link"

import {useState} from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MuiLink from "@material-ui/core/Link"
import IconButton from "@material-ui/core/IconButton"
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"

import Preferences from "./preferences"

import useStyles from "./styles"
import useStrings from "nextjs-global-app-state/useStrings"

export type Anchor = (EventTarget & HTMLButtonElement) | undefined

function Header(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings()
  const [preferencesAnchor, setPreferencesAnchor] = useState<Anchor>(undefined)
  return (
    <>
      <Head>
        <title>{strings.general.siteName}</title>
        <meta name={"description"} content={strings.general.description} />
      </Head>
      <AppBar color={"transparent"} elevation={0} position={"static"}>
        <Toolbar variant={"dense"}>
          <Typography className={styles.typography} variant={"overline"}>
            <NextLink href={{pathname: "/"}} passHref>
              <MuiLink
                className={styles.link}
                classes={{focusVisible: styles.linkFocusVisible}}
                color={"textSecondary"}
                underline={"none"}
              >
                {strings.general.siteName}
              </MuiLink>
            </NextLink>
          </Typography>
          <IconButton
            className={styles.iconButton}
            focusVisibleClassName={styles.iconButtonFocusVisible}
            onClick={(event): void => setPreferencesAnchor(event.currentTarget)}
            disableRipple={true}
            aria-controls={"preferences"}
            aria-haspopup={"true"}
            aria-label={"preferences"}
          >
            <SettingsRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Preferences
        anchor={preferencesAnchor}
        setAnchor={setPreferencesAnchor}
      />
    </>
  )
}

export default Header
