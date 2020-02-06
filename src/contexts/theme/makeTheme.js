import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

import {getThemeTypeAuto} from "util/theme"

function makeTheme(themeType) {
  return responsiveFontSizes(
      createMuiTheme({
        palette: {type: themeType === "auto" ? getThemeTypeAuto() : themeType},
      }),
  )
}

export default makeTheme
