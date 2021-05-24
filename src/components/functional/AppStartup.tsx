import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import APIClient from "../../core/APIClient";
import { Routes } from "../../core/Constants";
import { useAppDispatch } from "../../state/StateContext";

const AppStartup: React.FC = ({ children }) => {
  const [complete, setComplete] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const performInitialAuth = async () => {
      try {
        const response = await APIClient.auth.user();
        if (response) {
          dispatch({ type: "USER::LOGIN_SUCCESS", user: response.user });
          if (history.location.pathname === Routes.LOGIN) {
            history.replace(Routes.HOME);
          }
        } else {
          history.replace(Routes.LOGIN);
        }
      } catch {
        history.replace(Routes.LOGIN);
      } finally {
        setComplete(true);
      }
    };

    performInitialAuth();
  }, [dispatch, history]);

  return complete ? <>{children}</> : null;
};

export default AppStartup;
