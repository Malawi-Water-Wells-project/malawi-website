import { User } from "../../types/APITypes";

type SuccessfulUserLoginAction = { type: "USER::LOGIN_SUCCESS"; user: User };

export type IUserAction = SuccessfulUserLoginAction;
