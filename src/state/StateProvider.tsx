import React, { useReducer } from "react";
import RootReducer, { initialState } from "./reducers/RootReducer";
import StateContext from "./StateContext";

const StateProvider: React.FC = ({ children }) => (
  <StateContext.Provider value={useReducer(RootReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export default StateProvider;
