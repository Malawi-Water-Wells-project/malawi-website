import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Routes } from "../../core/Constants";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

const HomeView = React.lazy(() => import("../views/HomeView"));
const LoginView = React.lazy(() => import("../views/LoginView"));
const ManageTribesView = React.lazy(
  () => import("../views/tribes/ManageTribesView")
);
const CreateNewTribesView = React.lazy(
  () => import("../views/tribes/CreateNewTribeView")
);
const CreateNewTribeSuccessfulView = React.lazy(
  () => import("../views/tribes/CreateNewTribeSuccessfulView")
);

const PageNotFoundView = () => <>Page Not Found</>;

const Router: React.FC = () => (
  <Layout>
    <Suspense fallback={null}>
      <Switch>
        <ProtectedRoute path={Routes.HOME} component={HomeView} exact />
        <Route path={Routes.LOGIN} component={LoginView} exact />
        <ProtectedRoute
          path={Routes.MANAGE_TRIBES}
          component={ManageTribesView}
          exact
        />
        <ProtectedRoute
          path={Routes.CREATE_NEW_TRIBE}
          component={CreateNewTribesView}
          exact
        />
        <ProtectedRoute
          path={Routes.CREATE_NEW_TRIBE_SUCCESS}
          component={CreateNewTribeSuccessfulView}
          exact
        />
      </Switch>
    </Suspense>
  </Layout>
);

export default Router;
