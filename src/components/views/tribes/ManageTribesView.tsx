import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useHistory } from "react-router";
import { Routes } from "../../../core/Constants";
import ClickableCard from "../../components/ClickableCard";

const ManageTribesView: React.FC = () => {
  const history = useHistory();

  return (
    <CardDeck>
      <ClickableCard
        className="fade-in"
        onClick={() => history.push(Routes.CREATE_NEW_TRIBE)}
      >
        <Card.Body>
          <Card.Title>Create New Tribe</Card.Title>
        </Card.Body>
      </ClickableCard>
      <ClickableCard className="fade-in">
        <Card.Body>
          <Card.Title>Create New Tribe</Card.Title>
        </Card.Body>
      </ClickableCard>
    </CardDeck>
  );
};
export default ManageTribesView;
