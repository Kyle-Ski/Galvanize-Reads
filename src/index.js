import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "semantic-ui-css/semantic.min.css"
import AppProvider from "./context"

ReactDOM.render(
  <AppProvider.Provider>
    <App />
  </AppProvider.Provider>,
  document.getElementById("root")
)

serviceWorker.unregister()
