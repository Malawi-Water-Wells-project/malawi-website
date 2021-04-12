import { useEffect } from "react";
import { useAppState } from "../state/StateContext";
import { IBreadcrumb } from "../types/UITypes";
import { isEqual } from "lodash";

const useBreadcrumbs = (breadcrumbs: Array<IBreadcrumb>) => {
  const [state, dispatch] = useAppState();

  useEffect(() => {
    if (!isEqual(breadcrumbs, state.ui.breadcrumbs))
      dispatch({ type: "UI::SET_BREADCRUMBS", breadcrumbs });
  }, [state.ui.breadcrumbs, breadcrumbs, dispatch]);
};

export default useBreadcrumbs;
