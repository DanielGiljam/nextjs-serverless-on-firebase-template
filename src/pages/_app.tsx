import {Provider} from "react"

import appFactory from "nextjs-global-app-state/appFactory"
import lang from "nextjs-global-app-state/lang"
import theme from "nextjs-global-app-state/theme"

import {
  Theme,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"

import Wrapper from "../components/wrapper"
import ThemeProvider from "../components/theme-provider"

import fetch from "isomorphic-unfetch"

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
        responsiveFontSizes(createMuiTheme({palette: {type: themeType}})),
      ThemeProvider: ThemeProvider as Provider<Theme>,
    }),
  ],
})
