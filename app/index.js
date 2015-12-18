import "babel-polyfill"

import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import {syncReduxAndRouter} from "redux-simple-router"
import createBrowserHistory from "history/lib/createBrowserHistory"
import {IndexRoute, Route, Router} from "react-router"
import store from "resources/store"
import Application from "./containers/application"
import Spaces from "./containers/spaces"
import EditSpaces from "./containers/spaces/edit"

const history = createBrowserHistory()

document.addEventListener("DOMContentLoaded", () => {
  syncReduxAndRouter(history, store)

  render(<Provider store={store}>
    <Router history={history}>
      <Route component={Application} path="/">
        <IndexRoute component={Spaces} />
        <Route component={EditSpaces} path="/edit/:id" />
      </Route>
    </Router>
  </Provider>, document.querySelector("main"))
})
