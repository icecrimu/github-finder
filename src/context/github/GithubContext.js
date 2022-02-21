import React, { useEffect, useState } from "react"

export const GithubContext = React.createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export default function GithubProvider({ children }) {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchUsers() {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
    const data = await response.json()

    setUsers(data)
    setIsLoading(false)
  }

  return (
    <GithubContext.Provider value={{ users, isLoading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  )
}
