import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

function makeTheme(themeType) {
  return responsiveFontSizes(createMuiTheme({palette: {type: themeType}}))
}

export default makeTheme
