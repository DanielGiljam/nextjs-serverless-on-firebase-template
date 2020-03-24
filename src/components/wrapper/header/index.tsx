import {useState} from "react"

import Head from "next/head"
import NextLink from "next/link"

import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import MuiLink from "@material-ui/core/Link"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"

import Preferences from "./preferences"
import useStyles from "./styles"

export type Anchor = (EventTarget & HTMLButtonElement) | undefined

function Header(): JSX.Element {
  const styles = useStyles()
  const [preferencesAnchor, setPreferencesAnchor] = useState<Anchor>(undefined)
  const title = "Next.js Serverless on Firebase Demo"
  const description =
    "Next.js + build target: serverless + Cloud Functions for Firebase + Firebase Hosting"
  const anchor = "NEXTJS SERVERLESS ON FIREBASE DEMO"
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name={"description"} />
      </Head>
      <AppBar color={"transparent"} elevation={0} position={"static"}>
        <Toolbar variant={"dense"}>
          <Typography className={styles.typography} variant={"overline"} noWrap>
            <NextLink href={{pathname: "/"}} passHref>
              <MuiLink
                classes={{focusVisible: styles.linkFocusVisible}}
                className={styles.link}
                color={"textSecondary"}
                underline={"none"}
              >
                {anchor}
              </MuiLink>
            </NextLink>
          </Typography>
          <IconButton
            aria-controls={"preferences"}
            aria-haspopup={"true"}
            aria-label={"preferences"}
            className={styles.iconButton}
            focusVisibleClassName={styles.iconButtonFocusVisible}
            disableRipple
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
