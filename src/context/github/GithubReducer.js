export default function githubReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, isLoading: false }
    case "SET_LOADING":
      return { ...state, isLoading: true }
    case "CLEAR_USERS":
      return { ...state, users: [] }
    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        isLoading: false
      }
    default:
      return state
  }
}
