import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useHistory } from "react-router";
import { Routes } from "../../../core/Constants";
import ClickableCard from "../../components/ClickableCard";
import { Plus, Search } from "react-bootstrap-icons";

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
          <Card.Text>
            <Plus size={96} />
          </Card.Text>
        </Card.Body>
      </ClickableCard>
      <ClickableCard
        className="fade-in"
        onClick={() => history.push(Routes.TRIBE_SEARCH)}
      >
        <Card.Body>
          <Card.Title>Tribe Search</Card.Title>
          <Card.Text>
            <Search size={96} />
          </Card.Text>
        </Card.Body>
      </ClickableCard>
      <ClickableCard
        className="fade-in"
        onClick={() => history.push(Routes.CREATE_TRIBE_ADMIN)}
      >
        <Card.Body>
          <Card.Title>Create Tribe Admin</Card.Title>
          <Card.Text>
            <Search size={96} />
          </Card.Text>
        </Card.Body>
      </ClickableCard>
    </CardDeck>
  );
};
export default ManageTribesView;
