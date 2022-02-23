import React, { useContext, useEffect } from "react"
import { GithubContext } from "../context/github/GithubContext"
import { useParams } from "react-router-dom"

export default function User() {
  const { fetchUser, user } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    fetchUser(params.login)
  }, [])
  return <div>User</div>
}
