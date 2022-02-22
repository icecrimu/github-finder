import React, { useEffect, useReducer } from "react"
import githubReducer from "./GithubReducer"

export const GithubContext = React.createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export default function GithubProvider({ children }) {
  const initialState = {
    users: [],
    isLoading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (for testing)
  async function fetchUsers() {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
    const data = await response.json()

    dispatch({ type: "GET_USERS", payload: data })
  }

  function setLoading() {
    dispatch({ type: "SET_LOADING" })
  }

  async function fetchSearchUsers(text) {
    setLoading()
    const params = new URLSearchParams({
      q: text
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const { items } = await response.json()

    dispatch({ type: "GET_USERS", payload: items })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        fetchUsers,
        fetchSearchUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
