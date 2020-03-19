import {useState} from "react"

import Head from "next/head"
import NextLink from "next/link"

import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import MuiLink from "@material-ui/core/Link"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"

import useStrings from "nextjs-global-app-state/useStrings"

import Preferences from "./preferences"
import useStyles from "./styles"

export type Anchor = (EventTarget & HTMLButtonElement) | undefined

function Header(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings()
  const [preferencesAnchor, setPreferencesAnchor] = useState<Anchor>(undefined)
  return (
    <>
      <Head>
        <title>{strings.general.siteName}</title>
        <meta content={strings.general.description} name={"description"} />
      </Head>
      <AppBar color={"transparent"} elevation={0} position={"static"}>
        <Toolbar variant={"dense"}>
          <Typography className={styles.typography} variant={"overline"}>
            <NextLink href={{pathname: "/"}} passHref>
              <MuiLink
                classes={{focusVisible: styles.linkFocusVisible}}
                className={styles.link}
                color={"textSecondary"}
                underline={"none"}
              >
                {strings.general.siteName}
              </MuiLink>
            </NextLink>
          </Typography>
          <IconButton
            aria-controls={"preferences"}
            aria-haspopup={"true"}
            aria-label={"preferences"}
            className={styles.iconButton}
            disableRipple={true}
            focusVisibleClassName={styles.iconButtonFocusVisible}
            onClick={(event): void => setPreferencesAnchor(event.currentTarget)}
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
