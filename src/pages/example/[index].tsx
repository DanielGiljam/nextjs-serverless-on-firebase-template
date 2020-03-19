import {useRouter} from "next/router"

import Typography from "@material-ui/core/Typography"

import {Theme, createStyles, makeStyles} from "@material-ui/core/styles"

import useStrings from "nextjs-global-app-state/useStrings"
import format from "nextjs-global-app-state/util/strings/format"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(3),
      textAlign: "center",
    },
  }),
)

function Example(): JSX.Element {
  const styles = useStyles()
  const strings = useStrings()
  const router = useRouter()
  const {index: example} = router.query
  console.log("example router:", router)
  return (
    <Typography className={styles.typography} variant={"body1"}>
      {example ?
        format(
            strings.general.templates.thisIsTheXExample,
            Array.isArray(example) ? example[0] : example,
        ) :
        strings.example.thisIsNullExample}
    </Typography>
  )
}

export default Example
