export default function githubReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, isLoading: false }
    default:
      return state
  }
}
