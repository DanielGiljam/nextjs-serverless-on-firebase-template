import {createContext} from "react"

export const StringsContext = createContext(null)

export function StringsProvider({strings, children}) {
  return (
    <StringsContext.Provider value={strings}>
      {children}
    </StringsContext.Provider>
  )
}
