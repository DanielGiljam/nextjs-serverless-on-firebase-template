import {useRouter} from "next/router"

import Typography from "@material-ui/core/Typography"

import useStrings from "nextjs-global-app-state/useStrings"

import format from "nextjs-global-app-state/util/strings/format"

function Example() {
  const strings = useStrings()
  const router = useRouter()
  const {index: example} = router.query
  console.log("example router:", router)
  return (
    <Typography variant={"body1"}>
      {example ?
        format(strings.general.templates.thisIsTheXExample, example) :
        strings.example.thisIsNullExample}
    </Typography>
  )
}

export default Example
