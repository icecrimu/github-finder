import React, { useEffect, useReducer } from "react"
import githubReducer from "./GithubReducer"

export const GithubContext = React.createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export default function GithubProvider({ children }) {
  const initialState = {
    users: [],
    user: {},
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

  function handleClear() {
    dispatch({ type: "CLEAR_USERS" })
  }

  async function fetchUser(login) {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if (response.status === 404) {
      window.location = "/notfound"
    } else {
      const data = await response.json()

      dispatch({ type: "GET_USER", payload: data })
    }
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        fetchUser,
        isLoading: state.isLoading,
        fetchUsers,
        fetchSearchUsers,
        handleClear
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
