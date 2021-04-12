import { IBreadcrumb } from "../../types/UITypes";

type SetBreadcrumbs = {
  type: "UI::SET_BREADCRUMBS";
  breadcrumbs: Array<IBreadcrumb>;
};

export type IUIAction = SetBreadcrumbs;
