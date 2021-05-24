import { Well } from "../../types/APITypes";

type WellInitialLoadComplete = {
  type: "WELL::INITIAL_LOAD_COMPLETE";
  wells: Array<Well>;
};

export type IWellAction = WellInitialLoadComplete;
