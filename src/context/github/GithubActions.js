const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export async function fetchSearchUsers(text) {
  const params = new URLSearchParams({
    q: text
  })
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const { items } = await response.json()

  return items
}

export async function fetchUser(login) {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  if (response.status === 404) {
    window.location = "/notfound"
  } else {
    const data = await response.json()
    return data
  }
}

export async function fetchRepos(login) {
  const params = new URLSearchParams({
    sort: "createRenderer",
    per_page: 10
  })
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })
  const data = await response.json()
  return data
}
