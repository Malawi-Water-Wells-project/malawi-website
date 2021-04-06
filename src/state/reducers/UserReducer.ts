import { Reducer } from "react";
import { User } from "../../types/APITypes";
import { IAction } from "../actions";

export interface IUserState {
  currentUser: User | null;
}

export const initialUserState: IUserState = {
  currentUser: null,
};

const UserReducer: Reducer<IUserState, IAction> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case "USER::LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.user,
      };

    default:
      return state;
  }
};

export default UserReducer;
