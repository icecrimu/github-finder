export default function githubReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, isLoading: false }
    case "SET_LOADING":
      return { ...state, isLoading: true }
    case "CLEAR_USERS":
      return { ...state, users: [] }
    case "GET_USER":
      return { ...state, user: action.payload, isLoading: false }
    default:
      return state
  }
}
