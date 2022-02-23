import React, { useReducer } from "react"
import githubReducer from "./GithubReducer"

export const GithubContext = React.createContext()

export default function GithubProvider({ children }) {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
    repos: []
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
