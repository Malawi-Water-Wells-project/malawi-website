import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { AppBreadcrumbs, Routes } from "../../../core/Constants";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import ClickableCard from "../../components/ClickableCard";

const ManageWellsView: React.FC = () => {
  const history = useHistory();
  useBreadcrumbs(AppBreadcrumbs.MANAGE_WELLS);

  return (
    <CardDeck>
      <ClickableCard
        className="fade-in"
        onClick={() => history.push(Routes.CREATE_NEW_TRIBE)}
      >
        <Card.Body>
          <Card.Title>Add a Well</Card.Title>
          <Card.Text>
            <Plus size={96} />
          </Card.Text>
        </Card.Body>
      </ClickableCard>
      <ClickableCard
        className="fade-in"
        onClick={() => history.push(Routes.BULK_WELL_UPLOAD)}
      >
        <Card.Body>
          <Card.Title>Well Bulk Upload</Card.Title>
          <Card.Text>
            <Search size={96} />
          </Card.Text>
        </Card.Body>
      </ClickableCard>
    </CardDeck>
  );
};

export default ManageWellsView;
