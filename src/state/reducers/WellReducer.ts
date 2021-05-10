import { Reducer } from "react";
import { Well } from "../../types/APITypes";
import { IAction } from "../actions";

export interface IWellState {
  initialLoadComplete: boolean;
  wells: Array<Well>;
}

export const initialWellState: IWellState = {
  initialLoadComplete: false,
  wells: [],
};

const WellReducer: Reducer<IWellState, IAction> = (
  state = initialWellState,
  action
) => {
  switch (action.type) {
    case "WELL::INITIAL_LOAD_COMPLETE":
      return {
        ...state,
        initialLoadComplete: true,
        wells: action.wells,
      };
    default:
      return state;
  }
};

export default WellReducer;
