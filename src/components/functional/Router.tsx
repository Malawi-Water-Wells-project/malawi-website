import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const LoginView = React.lazy(() => import("../views/LoginView"));
const CardView = React.lazy(() => import("../views/CardView"));
const MainView = React.lazy(() => import("../views/MainView"));
const PageNotFoundView = () => <>Page Not Found</>;

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback="Loading...">
      <Switch>
        <Route path="/" component={LoginView} exact />
        <Route path="/CardView" component={CardView} exact />
        <Route path="/MainView" component={MainView} exact />
        <Route component={PageNotFoundView} exact />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;