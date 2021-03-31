import React from "react";
import "./scss/MalawiWellsAdmin.scss";
import Router from "./components/functional/Router";
import StateProvider from "./state/StateProvider";

const App: React.FC = () => (
  <StateProvider>
    <Router />
  </StateProvider>
);

export default App;
