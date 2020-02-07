import __app from "next/app"
import Head from "next/head"
import CssBaseline from "@material-ui/core/CssBaseline"
import Header from "components/header"
import CookieConsentSnackbar from "components/misc/cookie-consent-snackbar"

import {ThemeProvider} from "@material-ui/core/styles"
import {StringsProvider} from "contexts/strings"
import {GlobalAppStateProvider} from "contexts/global-app-state"

import makeTheme from "contexts/theme/makeTheme"
import makeStrings from "contexts/strings/makeStrings"
import makeGlobalAppState from "contexts/global-app-state/makeGlobalAppState"

import {
  getLangServerSide,
  getLangClientSide,
  setLang,
  extendStringClass,
} from "util/strings"
import {
  getThemeTypeServerSide,
  getThemeTypeClientSide,
  setThemeType,
} from "util/theme"
import {
  getCookieConsentServerSide,
  getCookieConsentClientSide,
  setCookieConsent,
  setCookies,
} from "util/cookies"

import fetch from "isomorphic-unfetch"
import parseCookies from "util/cookies/parse-cookies"

/*
 * Material-UI integration achieved thanks to this example: https://github.com/mui-org/material-ui/tree/master/examples/nextjs 2019-09-13
 */

class _app extends __app {
  constructor(props) {
    super(props)
    extendStringClass()
    const {strings, themeType, dehydratedAppState} = props.pageProps.appProps
    /* NOTE: makeStrings() vs makeTheme() vs makeGlobalAppState():
     * - makeStrings() provides a performance boost from a UX point of view if it runs server-side.
     * - makeTheme() cannot be run server-side due to it's return value not being serializable. (The return value from
     *   getInitialProps is always serialized. See https://nextjs.org/docs/api-reference/data-fetching/getInitialProps.)
     * - makeGlobalAppState() makes and returns an object that is heavily tied to the instantiated _app -component's
     *   state on the client-side, so as an obvious consequence it cannot be serialized and the function can't run
     *   server-side.
     */
    this.state = {
      strings,
      theme: makeTheme(themeType),
      globalAppState: makeGlobalAppState(dehydratedAppState, this),
    }
  }

  static async getInitialProps({Component, ctx}) {
    const appProps =
      ctx.req && ctx.res ? await this.getInitialPropsServer(ctx) : null
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    /* NOTE: The practice of returning everything inside the "pageProps" property of an object
     * is because Next.js expects the return value to look like that (the code would break otherwise).
     */
    return {pageProps: {appProps, pageProps}}
  }

  static async getInitialPropsServer({req, res}) {
    const dehydratedAppState = await fetch(
        `${process.env.ASSET_PREFIX}/data.json`,
    ).then((res) => res.json())
    const cookies = parseCookies(req.headers["cookie"])
    const lang = (dehydratedAppState.lang = await getLangServerSide(
        dehydratedAppState.languages,
        cookies,
        req.headers["accept-language"],
    ))
    const themeType = (dehydratedAppState.theme = await getThemeTypeServerSide(
        dehydratedAppState.themes,
        cookies,
    ))
    dehydratedAppState.cookieConsent = await getCookieConsentServerSide(cookies)
    /* NOTE: makeStrings() vs makeTheme() vs makeGlobalAppState():
     * - makeStrings() provides a performance boost from a UX point of view if it runs server-side.
     * - makeTheme() cannot be run server-side due to it's return value not being serializable. (The return value from
     *   getInitialProps is always serialized. See https://nextjs.org/docs/api-reference/data-fetching/getInitialProps.)
     * - makeGlobalAppState() makes and returns an object that is heavily tied to the instantiated _app -component's
     *   state on the client-side, so as an obvious consequence it cannot be serialized and the function can't run
     *   server-side.
     */
    return {strings: await makeStrings(lang), themeType, dehydratedAppState}
  }

  componentDidMount() {
    // 1. Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    // 2. Set language client side
    const {
      languages: supportedLanguages,
      lang: serverSideLang,
      theme: serverSideThemeType,
    } = this.state.globalAppState
    getLangClientSide(supportedLanguages, serverSideLang)
        .then((lang) => {
          if (lang !== serverSideLang) {
            return makeStrings(lang).then((strings) =>
              this.setState((prevState) => ({
                ...prevState,
                strings,
                globalAppState: {...prevState.globalAppState, lang},
              })),
            )
          }
        })
        .catch((error) => console.error(error.stack))
    // 3. Check theme client side
    getThemeTypeClientSide()
        .then((themeType) => {
          if (themeType !== serverSideThemeType) {
            return this.setState((prevState) => ({
              ...prevState,
              theme: makeTheme(themeType),
              globalAppState: {...prevState.globalAppState, theme: themeType},
            }))
          }
        })
        .catch((error) => console.error(error.stack))
    // 4. Check if client has allowed cookies
    if (!this.state.globalAppState.cookieConsent) {
      getCookieConsentClientSide()
          .then((cookieConsent) => {
            if (cookieConsent == null) {
              return this.setState((prevState) => ({
                ...prevState,
                globalAppState: {...prevState.globalAppState, cookieConsent},
              }))
            } else if (cookieConsent === true) {
              return this.setCookieConsent(cookieConsent)
            }
          })
          .catch((error) => console.error(error.stack))
    }
  }

  setLang(lang) {
    const {
      languages: supportedLanguages,
      cookieConsent,
    } = this.state.globalAppState
    setLang(supportedLanguages, cookieConsent, lang).then(() =>
      this.setState((prevState) => ({
        ...prevState,
        strings: makeStrings(lang),
        globalAppState: {...prevState.globalAppState, lang},
      })),
    )
  }

  setTheme(themeType) {
    const {
      themes: supportedThemeTypes,
      cookieConsent,
    } = this.state.globalAppState
    setThemeType(supportedThemeTypes, cookieConsent, themeType).then(() =>
      this.setState((prevState) => ({
        ...prevState,
        theme: makeTheme(themeType),
        globalAppState: {...prevState.globalAppState, theme: themeType},
      })),
    )
  }

  setCookieConsent(cookieConsent) {
    setCookieConsent(cookieConsent)
        .then(() =>
          this.setState((prevState) => ({
            ...prevState,
            globalAppState: {...prevState.globalAppState, cookieConsent},
          })),
        )
        .then(() => {
          if (cookieConsent) {
            const {lang, theme, cookieConsent} = this.state.globalAppState
            return setCookies({
              "lang": lang,
              "theme-type": theme,
              "cookie-consent": cookieConsent.toString(),
            })
          } else {
            return setCookies({})
          }
        })
        .catch((error) => console.error(error.stack))
  }

  render() {
    const {
      Component,
      pageProps: {pageProps},
    } = this.props
    const {strings, theme, globalAppState} = this.state
    return (
      <>
        <Head>
          <title>{strings.general.siteName}</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <StringsProvider strings={strings}>
            <GlobalAppStateProvider globalAppState={globalAppState}>
              <Header />
              <main style={{padding: theme.spacing(3)}}>
                <Component {...pageProps} />
              </main>
              <CookieConsentSnackbar />
            </GlobalAppStateProvider>
          </StringsProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default _app
