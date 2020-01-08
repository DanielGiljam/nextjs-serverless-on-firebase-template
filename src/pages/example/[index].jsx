import Typography from "@material-ui/core/Typography"

import {useRouter} from "next/router"
import useStrings from "resources/strings/useStrings"

function Example() {
  const router = useRouter()
  const strings = useStrings()
  const {index: example} = router.query
  console.log("example router:", router)
  return (
    <Typography variant={"body1"}>
      {example ?
        String.format(strings.general.templates.thisIsTheXExample, example) :
        strings.example.thisIsNullExample}
    </Typography>
  )
}

export default Example
