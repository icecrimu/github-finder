import React, { useReducer } from "react"
import alertReducer from "./AlertReducer"

export const AlertContext = React.createContext()

export default function AlertProvider({ children }) {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // Set an alert
  function setAlert(msg, type) {
    dispatch({ type: "SET_ALERT", payload: { msg, type } })

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000)
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}
