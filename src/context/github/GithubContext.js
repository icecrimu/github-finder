import React, { useEffect, useReducer } from "react"
import githubReducer from "./GithubReducer"

export const GithubContext = React.createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export default function GithubProvider({ children }) {
  const initialState = {
    users: [],
    isLoading: true
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  // const [users, setUsers] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  async function fetchUsers() {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
    const data = await response.json()

    // setUsers(data)
    // setIsLoading(false)
    dispatch({ type: "GET_USERS", payload: data })
  }

  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  )
}
