import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
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
const SearchTribeView = React.lazy(
  () => import("../views/tribes/SearchTribeView")
);

const CreateTribeAdminView = React.lazy(
  () => import("../views/tribes/CreateTribeAdminView")
);
const CreateTribeAdminSuccessView = React.lazy(
  () => import("../views/tribes/CreateTribeAdminSuccessView")
);
const ManageSingleTribeView = React.lazy(
  () => import("../views/tribes/ManageSingleTribeView")
);
const ManageWellsView = React.lazy(
  () => import("../views/wells/ManageWellsView")
);
const BulkWellUpload = React.lazy(
  () => import("../views/wells/BulkWellUpload")
);
const FindWellView = React.lazy(
  () => import("../views/wells/FindWellView")
);
const BulkWellHygieneUpload = React.lazy(
  () => import("../views/wells/BulkWellHygieneUpload")
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
          path={Routes.TRIBE_SEARCH}
          component={SearchTribeView}
          exact
        />
        <ProtectedRoute
          path={Routes.CREATE_NEW_TRIBE_SUCCESS}
          component={CreateNewTribeSuccessfulView}
          exact
        />

        <ProtectedRoute
          path={Routes.CREATE_TRIBE_ADMIN}
          component={CreateTribeAdminView}
          exact
        />
        <ProtectedRoute
          path={Routes.CREATE_TRIBE_ADMIN_SUCCESS}
          component={CreateNewTribeSuccessfulView}
          exact
        />
        <ProtectedRoute
          path={Routes.MANAGE_SINGLE_TRIBE}
          component={ManageSingleTribeView}
          exact
        />
        <ProtectedRoute
          path={Routes.MANAGE_WELLS}
          component={ManageWellsView}
          exact
        />
        <ProtectedRoute
          path={Routes.BULK_WELL_UPLOAD}
          component={BulkWellUpload}
          exact
        />
        <ProtectedRoute
          path={Routes.FIND_WELLS}
          component={FindWellView}
          exact
        />
        <ProtectedRoute
          path={Routes.BULK_WELL_HYGIENE_UPLOAD}
          component={BulkWellHygieneUpload}
          exact
        />
        <Route component={PageNotFoundView} />
      </Switch>
    </Suspense>
  </Layout>
);

export default Router;
