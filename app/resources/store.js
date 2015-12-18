import data from "./data"
import {createStore} from "redux"

function spacesReducers(state = {}, action) {
  switch (action.type) {
    case "ADD_SPACE":
      return Object.assign({}, state, {
        spaces: state.spaces.concat({foo: "bar"})
      })
    default:
      return state
  }
}

export function fetchStore(next = () => null) {
  const state = {}

  data.Space
    .getAll()
    .then(spaces => state.spaces = spaces)
    .then(() => next(createStore(spacesReducers, state)))
}

console.log(data)
