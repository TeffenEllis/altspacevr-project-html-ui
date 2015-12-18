function constantize(array) {
  const constants = {}

  array.forEach(entry => constants[entry] = entry)

  return Object.freeze(constants)
}

export default constantize([
  "ADD_SPACES",
  "ADD_USERS"
])
