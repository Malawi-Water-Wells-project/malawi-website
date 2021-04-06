import React, { ComponentProps, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Routes } from "../../core/Constants";
import { useAppStateSelector } from "../../state/StateContext";

const ProtectedRoute: React.FC<ComponentProps<typeof Route>> = (props) => {
  const user = useAppStateSelector((state) => state.user.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (user === null) history.replace(Routes.LOGIN);
  }, [user, history]);

  return user !== null ? <Route {...props} /> : null;
};

export default ProtectedRoute;
