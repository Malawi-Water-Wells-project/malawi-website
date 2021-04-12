import { Reducer } from "react";
import { IAction } from "../actions";
import UserReducer, { IUserState, initialUserState } from "./UserReducer";
import TribeReducer, { ITribeState, initialTribeState } from "./TribeReducer";
import UIReducer, { IUIState, initialUIState } from "./UIReducer";

export interface IState {
  user: IUserState;
  tribe: ITribeState;
  ui: IUIState;
}

export const initialState: IState = {
  user: initialUserState,
  tribe: initialTribeState,
  ui: initialUIState,
};

const RootReducer: Reducer<IState, IAction> = (
  state = initialState,
  action
) => ({
  user: UserReducer(state.user, action),
  tribe: TribeReducer(state.tribe, action),
  ui: UIReducer(state.ui, action),
});

export default RootReducer;
