import {ReactNode} from "react"

import CssBaseline from "@material-ui/core/CssBaseline"

import {
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles"

interface ThemeProviderProps {
  value: Theme;
  children: ReactNode;
}

function ThemeProvider({value, children}: ThemeProviderProps): JSX.Element {
  return (
    <MuiThemeProvider theme={value}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
