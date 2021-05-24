import type { ITribeAction } from "./TribeActions";
import { IUIAction } from "./UIActions";
import type { IUserAction } from "./UserActions";
import { IWellAction } from "./WellActions";

export type IAction = IUserAction | ITribeAction | IUIAction | IWellAction;
