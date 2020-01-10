import PropTypes from "prop-types"

import {createContext} from "react"

export const GlobalAppStateContext = createContext(null)

export function GlobalAppStateProvider({globalAppState, children}) {
  return (
    <GlobalAppStateContext.Provider value={globalAppState}>
      {children}
    </GlobalAppStateContext.Provider>
  )
}

GlobalAppStateProvider.propTypes = {
  globalAppState: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
}
