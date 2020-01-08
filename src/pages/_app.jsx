import __app from "next/app"
import Head from "next/head"
import CssBaseline from "@material-ui/core/CssBaseline"
import Header from "components/header"

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

import parseCookieHeader from "utility/parse-cookie-header"

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
    const cookies = parseCookieHeader(req.headers["cookie"])
    const lang = await getLangServerSide(
        cookies,
        req.headers["accept-language"],
    )
    const themeType = await getThemeTypeServerSide(cookies)
    res.setHeader("Set-Cookie", [`lang=${lang}`, `theme-type=${themeType}`]) // TODO: check cookie-consent before doing this!
    /* NOTE: makeStrings() vs makeTheme():
     * - makeStrings() is asynchronous and gives by performance benefit by being run server-side
     * - makeTheme() is synchronous and cannot be run server-side due to it's return value not being serializable
     *   and the "official" MUI + Next.js integration presuming that it's run client-side
     */
    return {strings: await makeStrings(lang), themeType}
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    // Set language client side
    getLangClientSide().then((lang) => {
      if (lang !== this.state.strings.lang) {
        console.log("getLangClientSide: changing language...")
        makeStrings(lang).then((strings) => this.setState({strings}))
      }
    })
  }

  render() {
    const {
      Component,
      pageProps: {appProps, ...pageProps},
    } = this.props
    const {strings, theme} = this.state
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
          </StringsProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default _app
