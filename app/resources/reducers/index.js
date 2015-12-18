import spaces from "./spaces"
import users from "./users"
import {routeReducer} from "redux-simple-router"
import {combineReducers} from "redux"

export default combineReducers({
  routing: routeReducer,
  spaces,
  users
})
