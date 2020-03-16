import Typography from "@material-ui/core/Typography"

import useStrings from "nextjs-global-app-state/useStrings"

import format from "nextjs-global-app-state/util/strings/format"
import ucFirst from "nextjs-global-app-state/util/strings/ucFirst"

function Index() {
  const strings = useStrings()
  return (
    <>
      <Typography variant={"body1"}>
        {format(
            strings.general.templates.thisIsTheXPage,
            ucFirst(strings.general.pageNames.home),
        )}
      </Typography>
    </>
  )
}

export default Index
