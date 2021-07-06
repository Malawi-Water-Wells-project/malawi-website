import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppBreadcrumbs, Routes } from "../../../core/Constants";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import { useAppState } from "../../../state/StateContext";
import ReadingWidth from "../../components/ReadingWidth";

const CreateNewTribeSuccessView: React.FC = () => {
  const [state] = useAppState();
  const history = useHistory();
  useBreadcrumbs(AppBreadcrumbs.CREATE_NEW_TRIBE_SUCCESS);

  useEffect(() => {
    if (state.tribe.currentTribe === null) {
      history.replace(Routes.CREATE_NEW_TRIBE);
    }
  }, [state.tribe.currentTribe, history]);

  return (
    <ReadingWidth className="fade-in">
      <h1 className="page-heading">Village successfully created</h1>
      <p className="lead">
        You can now add village admins to this village, or you can continue later.
        You can also go back and create a another village.
        <br />
        All changes have been saved and can be resumed at a later date.
      </p>
      <Button size="lg" className="mr-3">
        Add Tribe Admins to {state.tribe.currentTribe?.name}
      </Button>
      <Button
        size="lg"
        variant="secondary"
        onClick={() => history.replace(Routes.MANAGE_TRIBES)}
      >
        Continue Later
      </Button>
    </ReadingWidth>
  );
};

export default CreateNewTribeSuccessView;
