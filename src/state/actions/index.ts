import type { ITribeAction } from "./TribeActions";
import { IUIAction } from "./UIActions";
import type { IUserAction } from "./UserActions";

export type IAction = IUserAction | ITribeAction | IUIAction;
