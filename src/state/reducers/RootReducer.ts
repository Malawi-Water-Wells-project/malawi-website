import { Reducer } from "react";
import { IAction } from "../actions";
import UserReducer, { IUserState, initialUserState } from "./UserReducer";
import TribeReducer, { ITribeState, initialTribeState } from "./TribeReducer";
import UIReducer, { IUIState, initialUIState } from "./UIReducer";
import WellReducer, { IWellState, initialWellState } from "./WellReducer";

export interface IState {
  user: IUserState;
  tribe: ITribeState;
  ui: IUIState;
  well: IWellState;
}

export const initialState: IState = {
  user: initialUserState,
  tribe: initialTribeState,
  ui: initialUIState,
  well: initialWellState,
};

const RootReducer: Reducer<IState, IAction> = (
  state = initialState,
  action
) => ({
  user: UserReducer(state.user, action),
  tribe: TribeReducer(state.tribe, action),
  ui: UIReducer(state.ui, action),
  well: WellReducer(state.well, action),
});

export default RootReducer;
