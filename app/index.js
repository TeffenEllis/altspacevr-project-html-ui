import "babel-polyfill"

import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import {fetchStore} from "resources/store"
import Application from "./containers/application"

document.addEventListener("DOMContentLoaded", () => {
  fetchStore(store => {
    render(<Provider store={store}>
      <Application />
    </Provider>, document.querySelector("main"))
  })
})
