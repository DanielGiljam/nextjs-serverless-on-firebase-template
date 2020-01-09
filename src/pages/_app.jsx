import __app from "next/app"
import Head from "next/head"
import CssBaseline from "@material-ui/core/CssBaseline"
import Header from "components/header"
import CookieConsentSnackbar from "components/misc/cookie-consent-snackbar"

import {ThemeProvider} from "@material-ui/core/styles"
import {StringsProvider} from "resources/strings"

import makeStrings from "resources/strings/makeStrings"
import makeTheme from "resources/theme/makeTheme"

import {
  getLangServerSide,
  getLangClientSide,
  extendStringClass,
} from "resources/strings/functions"
import {getThemeTypeServerSide} from "resources/theme/functions"
import {
  getCookieConsentClientSide,
  setCookieConsentClientSide,
} from "utility/cookie-consent"

import parseCookies from "utility/parse-cookies"

/*
 * Material-UI integration achieved thanks to this example: https://github.com/mui-org/material-ui/tree/master/examples/nextjs 2019-09-13
 */

class _app extends __app {
  constructor(props) {
    super(props)
    extendStringClass()
    const {strings, themeType} = props.pageProps.appProps
    /* NOTE: makeStrings() vs makeTheme():
     * - makeStrings() is asynchronous and gives by performance benefit by being run server-side.
     * - makeTheme() is synchronous and cannot be run server-side due to it's return value not being serializable
     *   and the "official" MUI + Next.js integration presuming that it's run client-side.
     */
    this.state = {strings, theme: makeTheme(themeType)}
  }

  static async getInitialProps({Component, ctx}) {
    const appProps =
      ctx.req && ctx.res ? await this.getInitialPropsServer(ctx) : {}
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    /* NOTE: The practice of returning everything inside the "pageProps" property of an object
     * is because Next.js expects the return value to look like that (the code would break otherwise).
     */
    return {pageProps: {appProps, ...pageProps}}
  }

  static async getInitialPropsServer({req, res}) {
    const cookies = parseCookies(req.headers["cookie"])
    const lang = await getLangServerSide(
        cookies,
        req.headers["accept-language"],
    )
    const themeType = await getThemeTypeServerSide(cookies)
    if (cookies["cookie-consent"] === "true") {
      // TODO: be more verbose about setting cookies!
      // TODO: implement expiration timestamps for cookies that are set!
      res.setHeader("Set-Cookie", [`lang=${lang}`, `theme-type=${themeType}`])
    }
    /* NOTE: makeStrings() vs makeTheme():
     * - makeStrings() is asynchronous and gives by performance benefit by being run server-side
     * - makeTheme() is synchronous and cannot be run server-side due to it's return value not being serializable
     *   and the "official" MUI + Next.js integration presuming that it's run client-side
     */
    return {strings: await makeStrings(lang), themeType}
  }

  componentDidMount() {
    // 1. Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    // (Parse cookies as they are read from in the following steps)
    const cookies = parseCookies(document.cookie)
    // 2. Check if client has allowed cookies
    getCookieConsentClientSide(cookies)
        .then((cookieConsent) => {
          if (cookieConsent == null) this.setState({showCCS: true})
        })
        .catch((error) => console.error(error.stack))
    // 3. Set language client side
    getLangClientSide(cookies)
        .then((lang) => {
          if (lang !== this.state.strings.lang) {
            makeStrings(lang).then((strings) => this.setState({strings}))
          }
        })
        .catch((error) => console.error(error.stack))
  }

  setCookieConsent(cookieConsent) {
    setCookieConsentClientSide(cookieConsent)
        .then(() => this.setState({showCCS: false}))
        .catch((error) => console.error(error.stack))
  }

  render() {
    const {
      Component,
      pageProps: {appProps, ...pageProps},
    } = this.props
    const {strings, theme, showCCS} = this.state
    return (
      <>
        <Head>
          <title>{strings.general.siteName}</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <StringsProvider strings={strings}>
            <Header />
            <main style={{padding: theme.spacing(3)}}>
              <Component {...pageProps} />
            </main>
            <CookieConsentSnackbar
              show={!!showCCS}
              setCookieConsent={this.setCookieConsent.bind(this)}
            />
          </StringsProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default _app
