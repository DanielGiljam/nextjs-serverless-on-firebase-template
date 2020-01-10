import PropTypes from "prop-types"

import {createContext} from "react"

export const StringsContext = createContext(null)

export function StringsProvider({strings, children}) {
  return (
    <StringsContext.Provider value={strings}>
      {children}
    </StringsContext.Provider>
  )
}

StringsProvider.propTypes = {
  strings: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
}
