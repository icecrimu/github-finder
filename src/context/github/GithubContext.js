import React, { useEffect, useReducer } from "react"
import { createRenderer } from "react-dom/test-utils"
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

  // function handleClear() {
  //   dispatch({ type: "CLEAR_USERS" })
  // }

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
