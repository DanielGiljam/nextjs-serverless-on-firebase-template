import Typography from "@material-ui/core/Typography"

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"

import useStrings from "nextjs-global-app-state/useStrings"

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
  const strings = useStrings().index
  return (
    <Typography className={styles.typography} variant={"body1"}>
      {strings.placeholderText}
    </Typography>
  )
}

export default Index
