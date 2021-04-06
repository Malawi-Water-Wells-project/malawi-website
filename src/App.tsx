import React from "react";
import "./scss/MalawiWellsAdmin.scss";
import Router from "./components/functional/Router";
import StateProvider from "./state/StateProvider";
import AppStartup from "./components/functional/AppStartup";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => (
  <StateProvider>
    <BrowserRouter>
      <AppStartup>
        <Router />
      </AppStartup>
    </BrowserRouter>
  </StateProvider>
);

export default App;
