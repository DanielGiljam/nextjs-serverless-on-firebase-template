import {useContext} from "react"

import {StringsContext as GlobalAppStateContext} from "./index"

export default function useGlobalAppState() {
  return useContext(GlobalAppStateContext)
}
