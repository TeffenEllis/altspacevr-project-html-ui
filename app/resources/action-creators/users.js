import $ from "resources/constants"

export function addUsers(users) {
  return {type: $.ADD_USERS, users}
}
