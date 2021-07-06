import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppBreadcrumbs, Routes } from "../../../core/Constants";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import { useAppState } from "../../../state/StateContext";
import ReadingWidth from "../../components/ReadingWidth";

const CreateTribeAdminSuccessView: React.FC = () => {
  const [state] = useAppState();
  const history = useHistory();
  useBreadcrumbs(AppBreadcrumbs.CREATE_TRIBE_ADMIN_SUCCESS);

  useEffect(() => {
    if (state.tribe.currentTribe === null) {
      history.replace(Routes.CREATE_NEW_TRIBE);
    }
  }, [state.tribe.currentTribe, history]);

  return (
    <ReadingWidth className="fade-in">
      <h1 className="page-heading">Village Admin successfully created</h1>
      <p className="lead">All changes have been saved.</p>
      <Button size="lg" className="mr-3">
        Go to home
      </Button>
    </ReadingWidth>
  );
};
export default CreateTribeAdminSuccessView;
