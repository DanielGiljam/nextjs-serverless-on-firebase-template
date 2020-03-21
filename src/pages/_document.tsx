import {Fragment} from "react"

import __document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

import ServerStyleSheets from "@material-ui/styles/ServerStyleSheets"

/*
 * Material-UI integration achieved thanks to this example: https://github.com/mui-org/material-ui/tree/master/examples/nextjs 2019-09-13
 */

// eslint-disable-next-line @typescript-eslint/class-name-casing
class _document extends __document {
  static async getInitialProps(
      ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    /* Resolution order
     *
     * On the server:
     * 1. app.getInitialProps
     * 2. page.getInitialProps
     * 3. document.getInitialProps
     * 4. app.render
     * 5. page.render
     * 6. document.render
     *
     * On the server with error:
     * 1. document.getInitialProps
     * 2. app.render
     * 3. page.render
     * 4. document.render
     *
     * On the client
     * 1. app.getInitialProps
     * 2. page.getInitialProps
     * 3. app.render
     * 4. page.render
     */

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = (): ReturnType<DocumentContext["renderPage"]> =>
      originalRenderPage({
        enhanceApp: (App) => (
            props,
        ): ReturnType<ServerStyleSheets["collect"]> =>
          sheets.collect(<App {...props} />),
      })

    const initialProps = await __document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        <Fragment key={"styles"}>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </Fragment>,
      ],
    }
  }

  render(): JSX.Element {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.dehydratedState.lang.value}>
        <Head>
          <link href={"/icons/favicon-16.png"} rel={"icon"} sizes={"16x16"} />
          <link href={"/icons/favicon-32.png"} rel={"icon"} sizes={"32x32"} />
          <link href={"/icons/favicon-57.png"} rel={"icon"} sizes={"57x57"} />
          <link href={"/icons/favicon-76.png"} rel={"icon"} sizes={"76x76"} />
          <link href={"/icons/favicon-96.png"} rel={"icon"} sizes={"96x96"} />
          <link
            href={"/icons/favicon-128.png"}
            rel={"icon"}
            sizes={"128x128"}
          />
          <link
            href={"/icons/favicon-144.png"}
            rel={"icon"}
            sizes={"144x144"}
          />
          <link
            href={"/icons/favicon-152.png"}
            rel={"icon"}
            sizes={"152x152"}
          />
          <link
            href={"/icons/favicon-180.png"}
            rel={"icon"}
            sizes={"180x180"}
          />
          <link
            href={"/icons/favicon-192.png"}
            rel={"icon"}
            sizes={"192x192"}
          />

          <link
            href={"/icons/apple-touch-icon-precomposed-180.png"}
            rel={"apple-touch-icon-precomposed"}
            sizes={"180x180"}
          />
          <link
            color={"#262626"}
            href={"/icons/icon-mask.svg"}
            rel={"mask-icon"}
          />

          <meta content={"#262626"} name={"msapplication-TileColor"} />
          <meta
            content={"/icons/msapplication/mediumtile-144.png"}
            name={"msapplication-TileImage"}
          />

          <meta
            content={"Next.js Serverless on Firebase Demo"}
            name={"application-name"}
          />
          <meta
            content={"Next.js Serverless on Firebase Demo"}
            name={"msapplication-tooltip"}
          />
          <meta
            content={"/icons/msapplication/ieconfig.xml"}
            name={"msapplication-config"}
          />

          <link
            href={
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            }
            rel={"stylesheet"}
          />
          <link
            href={"https://fonts.googleapis.com/icon?family=Material+Icons"}
            rel={"stylesheet"}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default _document
