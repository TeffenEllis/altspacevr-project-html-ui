import $ from "resources/constants"

export default function spaces(state = [], action) {
  if (action.type === $.ADD_SPACES) {
    return state.concat(action.spaces)
  }

  return state
}
