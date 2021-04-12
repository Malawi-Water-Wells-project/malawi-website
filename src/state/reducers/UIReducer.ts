import { Reducer } from "react";
import { IBreadcrumb } from "../../types/UITypes";
import { IAction } from "../actions";

export interface IUIState {
  breadcrumbs: Array<IBreadcrumb>;
}

export const initialUIState: IUIState = {
  breadcrumbs: [],
};

const UIReducer: Reducer<IUIState, IAction> = (
  state = initialUIState,
  action
) => {
  switch (action.type) {
    case "UI::SET_BREADCRUMBS":
      return {
        ...state,
        breadcrumbs: action.breadcrumbs,
      };
    default:
      return state;
  }
};

export default UIReducer;
