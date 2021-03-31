import { Reducer } from "react";
import { Tribe } from "../../types/TribeTypes";
import { IAction } from "../actions";

export interface ITribeState {
  currentTribe: Tribe | null;
}

export const initialTribeState: ITribeState = {
  currentTribe: null,
};

const TribeReducer: Reducer<ITribeState, IAction> = (
  state = initialTribeState,
  action
) => {
  switch (action.type) {
    case "TRIBE::SET_CURRENT_TRIBE":
      return {
        ...state,
        currentTribe: action.tribe,
      };

    default:
      return state;
  }
};

export default TribeReducer;
