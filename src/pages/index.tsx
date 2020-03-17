import Typography from "@material-ui/core/Typography"

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"
import useStrings from "nextjs-global-app-state/useStrings"

import format from "nextjs-global-app-state/util/strings/format"
import ucFirst from "nextjs-global-app-state/util/strings/ucFirst"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(3),
      textAlign: "center",
    },
  }),
)

function Index(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings()
  return (
    <Typography className={styles.typography} variant={"body1"}>
      {format(
          strings.general.templates.thisIsTheXPage,
          ucFirst(strings.general.pageNames.home),
      )}
    </Typography>
  )
}

export default Index
