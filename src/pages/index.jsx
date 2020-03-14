import Head from "next/head"

import Typography from "@material-ui/core/Typography"

import useStrings from "nextjs-global-app-state/useStrings"

function Index() {
  const strings = useStrings()
  return (
    <>
      <Typography variant={"body1"}>
        {String.format(
            strings.general.templates.thisIsTheXPage,
            strings.general.pageNames.home.ucFirst(),
        )}
      </Typography>
    </>
  )
}

export default Index
