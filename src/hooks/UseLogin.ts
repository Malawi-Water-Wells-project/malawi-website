import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import APIClient from "../core/APIClient";
import AuthClient from "../core/auth/AuthClient";
import { Routes } from "../core/Constants";
import { useAppState } from "../state/StateContext";

const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isWorking, setIsWorking] = useState<boolean>(false);

  const [state, dispatch] = useAppState();
  const history = useHistory();

  useEffect(() => {
    if (state.user.currentUser !== null) {
      if (history.length > 1) history.goBack();
      else history.replace(Routes.HOME);
    }
  }, [state.user.currentUser, history]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsWorking(true);
    setError("");

    const { ok, tokens, user } = await APIClient.auth.login(username, password);

    if (ok) {
      AuthClient.setTokens(tokens);
      dispatch({ type: "USER::LOGIN_SUCCESS", user });
      history.replace(Routes.HOME);
    } else {
      setError("Please check your details and try again.");
    }

    setIsWorking(false);
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    isWorking,
    error,
  };
};

export default useLogin;
