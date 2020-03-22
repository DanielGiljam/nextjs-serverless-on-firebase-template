import {Provider} from "react"

import {
  Theme,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"

import appFactory from "nextjs-global-app-state-strict-demo/appFactory"
import lang from "nextjs-global-app-state-strict-demo/lang"
import theme from "nextjs-global-app-state-strict-demo/theme"

import fetch from "isomorphic-unfetch"

import ThemeProvider from "../components/theme-provider"
import Wrapper from "../components/wrapper"

import "../theme/_app.css"

export default appFactory({
  Wrapper: Wrapper,
  properties: [
    lang({
      defaultLang: "en",
      defaultSupportedLanguages: ["en", "sv", "fi"],
      getStrings: async (lang) =>
        await fetch(`${process.env.ASSET_PREFIX}/string-resources/${lang}.json`)
            .then((res) => res.json())
            .catch(() => {
              console.error(`Failed to fetch string resources for "${lang}".`)
              return {}
            }),
    }),
    theme({
      createTheme: (themeType) =>
        responsiveFontSizes(
            createMuiTheme({
              palette:
              themeType === "server" ?
                {type: "dark", background: {default: "#000000"}} :
                {type: themeType},
            }),
        ),
      ThemeProvider: ThemeProvider as Provider<Theme>,
    }),
  ],
})
