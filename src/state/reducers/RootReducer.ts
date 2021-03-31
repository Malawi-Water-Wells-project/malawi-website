import { Reducer } from "react";
import { IAction } from "../actions";
import UserReducer, { IUserState, initialUserState } from "./UserReducer";
import TribeReducer, { ITribeState, initialTribeState } from "./TribeReducer";

export interface IState {
  user: IUserState;
  tribe: ITribeState;
}

export const initialState: IState = {
  user: initialUserState,
  tribe: initialTribeState,
};

const RootReducer: Reducer<IState, IAction> = (
  state = initialState,
  action
) => ({
  user: UserReducer(state.user, action),
  tribe: TribeReducer(state.tribe, action),
});

export default RootReducer;
