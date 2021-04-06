import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Routes } from "../../core/Constants";
import Layout from "../components/Layout";

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
const CreateTribeAdminView = React.lazy(
  () => import("../views/tribes/CreateTribeAdminView")
);
const CreateTribeAdminSuccessView = React.lazy(
  () => import("../views/tribes/CreateTribeAdminSuccessView")
);

const PageNotFoundView = () => <>Page Not Found</>;

const Router: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={null}>
        <Switch>
          <Route path={Routes.HOME} component={HomeView} exact />
          <Route path={Routes.LOGIN} component={LoginView} exact />
          <Route
            path={Routes.MANAGE_TRIBES}
            component={ManageTribesView}
            exact
          />
          <Route
            path={Routes.CREATE_NEW_TRIBE}
            component={CreateNewTribesView}
            exact
          />
          <Route
            path={Routes.CREATE_NEW_TRIBE_SUCCESS}
            component={CreateTribeAdminView}
            exact
          />
          <Route
            path={Routes.CREATE_TRIBE_ADMIN}
            component={CreateTribeAdminView}
            exact
          />
          <Route
            path={Routes.CREATE_TRIBE_ADMIN_SUCCESS}
            component={CreateNewTribeSuccessfulView}
            exact
          />
        </Switch>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default Router;
