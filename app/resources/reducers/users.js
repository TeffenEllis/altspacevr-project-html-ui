import $ from "resources/constants"

export default function users(state = [], action) {
  if (action.type === $.ADD_USERS) {
    return action.users
  }

  return state
}
