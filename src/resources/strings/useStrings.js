import {useContext} from "react"

import {StringsContext} from "./index"

export default function useStrings() {
  return useContext(StringsContext)
}
