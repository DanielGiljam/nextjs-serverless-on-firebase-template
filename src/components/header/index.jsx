import Head from "next/head"
import Link from "next/link"
import {useRouter} from "next/router"

import {useEffect, useState} from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"

import Preferences from "./preferences"

import useStrings from "nextjs-global-app-state/useStrings"
import useGlobalAppState from "nextjs-global-app-state/useGlobalAppState"

function Header() {
  const strings = useStrings()
  const {setLang} = useGlobalAppState()
  const [preferencesAnchor, setPreferencesAnchor] = useState(null)
  const router = useRouter()
  useEffect(() => {
    let lang
    if (
      (lang = Array.isArray(router.query._lang) ?
        router.query._lang[0] :
        router.query._lang)
    ) {
      router.query._lang = undefined
      setLang(lang)
    }
  }, [router.query._lang])
  return (
    <>
      <Head>
        <title>{strings.general.siteName}</title>
        <meta
          key={"description"}
          name={"description"}
          content={strings.general.description}
        />
      </Head>
      <AppBar position={"static"}>
        <Toolbar>
          <Typography component={"h1"} variant={"h6"} style={{flexGrow: 1}}>
            {strings.general.siteName}
          </Typography>
          <Link href={{pathname: "/"}} passHref>
            <Button component={"a"} color={"inherit"}>
              {strings.general.pageNames.home.ucFirst()}
            </Button>
          </Link>
          <Link href={{pathname: "/about"}} passHref>
            <Button component={"a"} color={"inherit"}>
              {strings.general.pageNames.about.ucFirst()}
            </Button>
          </Link>
          <IconButton
            onClick={(event) => setPreferencesAnchor(event.currentTarget)}
            color={"inherit"}
            aria-controls={"preferences"}
            aria-haspopup={"true"}
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
