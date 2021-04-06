import { createContext, Dispatch, useContext } from "react";
import { IAction } from "./actions";
import { IState, initialState } from "./reducers/RootReducer";

export type StateContextType = [IState, Dispatch<IAction>];

const StateContext = createContext<StateContextType>([initialState, () => {}]);

export const useAppState = () => useContext(StateContext);

export const useAppDispatch = () => useContext(StateContext)[1];

export const useAppStateSelector = <T extends unknown>(
  selector: (state: IState) => T
) => selector(useAppState()[0]);

export default StateContext;
