import Link from "next/link"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import useStrings from "../../resources/strings/useStrings"

function Header() {
  const strings = useStrings()
  return (
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
      </Toolbar>
    </AppBar>
  )
}

export default Header
