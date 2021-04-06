import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import APIClient from "../core/APIClient";
import { useAppState } from "../state/StateContext";

const validateTribeAdmin = (name: string, username: string, password: string) => {
    const nameErrors = [];
    const usernameErrors = [];
    const passwordErrors = [];

    if (name.length <= 0) {
      nameErrors.push("Name must not be empty");
    }
  
    if (username.length <= 0) {
      usernameErrors.push("Username must not be empty");
    }

    if (password.length <= 0) {
        passwordErrors.push("Password must not be empty")
    }
  
    return {
        nameErrors,
        usernameErrors,
        passwordErrors,
        hasFailed: Boolean( nameErrors.length  || usernameErrors.length || passwordErrors.length),
    };
  };

const useCreateTribeAdmin = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameErrors, setNameErrors] = useState<string[]>([]);
    const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const dispatch = useAppState()[1];
    const history = useHistory();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = validateTribeAdmin(name, username, password);
        setNameErrors(result.nameErrors);
        setUsernameErrors(result.usernameErrors);
        setPasswordErrors(result.passwordErrors);

        if (result.hasFailed) {
            return;
        }

        const { success, tribeAdmin } = await APIClient.tribeAdmin.createTribeAdmin({
            name,
            username,
            password,
        });

        if (!success) return; // TODO: Failure Response

        // need to add dispatch to push route and do type thingy
    }
    return {
        name,
        username,
        password,
        setName,
        setUsername,
        setPassword,
        handleSubmit,
        nameErrors,
        usernameErrors,
        passwordErrors,
    };
}
export default useCreateTribeAdmin;