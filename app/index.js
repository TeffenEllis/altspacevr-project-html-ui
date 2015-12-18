import "babel-polyfill"

import React from "react"
import {render} from "react-dom"
import {IndexRoute, Route, Router} from "react-router"
import Application from "./containers/application"
import Spaces from "./containers/spaces"
import EditSpaces from "./containers/spaces/edit"

document.addEventListener("DOMContentLoaded", () => {
  render(<Router>
    <Route component={Application} path="/">
      <IndexRoute component={Spaces} />
      <Route component={EditSpaces} path="/edit/:id" />
      <Route component={EditSpaces} path="/new" />
    </Route>
  </Router>, document.querySelector("main"))
})
