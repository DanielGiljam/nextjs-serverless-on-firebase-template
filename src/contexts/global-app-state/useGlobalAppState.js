import {useContext} from "react"

import {GlobalAppStateContext} from "./index"

export default function useGlobalAppState() {
  return useContext(GlobalAppStateContext)
}
