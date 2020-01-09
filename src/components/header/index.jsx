import Link from "next/link"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"
import Preferences from "./preferences"

import useStrings from "resources/strings/useStrings"
import {useState} from "react"

function Header() {
  const strings = useStrings()
  const [preferencesAnchor, setPreferencesAnchor] = useState(null)
  return (
    <>
      <AppBar position={"static"}>
        <Toolbar>
          <Typography component="h1" variant="h6" style={{flexGrow: 1}}>
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
