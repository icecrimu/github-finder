import React, { useEffect, useReducer } from "react"
import { createRenderer } from "react-dom/test-utils"
import githubReducer from "./GithubReducer"

export const GithubContext = React.createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export default function GithubProvider({ children }) {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
    repos: []
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

  async function fetchRepos(login) {
    setLoading()
    const params = new URLSearchParams({
      sort: "createRenderer",
      per_page: 10
    })
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    )
    const data = await response.json()

    dispatch({ type: "GET_REPOS", payload: data })
  }

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch
        // fetchUser,
        // fetchUsers,
        // fetchSearchUsers,
        // handleClear,
        // fetchRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
