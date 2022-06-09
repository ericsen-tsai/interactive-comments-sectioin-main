import React, { StrictMode } from "react"
import ReactDom from "react-dom/client"
import { store } from "./app/store"
import { Provider } from "react-redux"
import App from "./App"

import "./index.scss"

const root = ReactDom.createRoot(document.querySelector("#root"))
root.render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
)
