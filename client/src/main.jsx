import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import ThemeProvider from "./components/ThemeProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
)
