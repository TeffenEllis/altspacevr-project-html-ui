import $ from "resources/constants"

export default function users(state = [], action) {
  if (action.type === $.ADD_USERS) {
    return state.concat(action.users)
  }

  return state
}
