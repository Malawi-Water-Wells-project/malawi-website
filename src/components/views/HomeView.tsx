import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import { PeopleFill, LockFill } from "react-bootstrap-icons";
import ClickableCard from "../components/ClickableCard";
import { Routes } from "../../core/Constants";
import { CardDeck } from "reactstrap";

const CardView: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <CardDeck>
        <ClickableCard onClick={() => history.push(Routes.MANAGE_TRIBES)}>
          <Card.Body>
            <Card.Title>Manage Tribes</Card.Title>
            <Card.Text>
              <PeopleFill size={96} />
            </Card.Text>
          </Card.Body>
        </ClickableCard>
        <ClickableCard onClick={() => history.push(Routes.MANAGE_TRIBES)}>
          <Card.Body>
            <Card.Title>Manage Accounts</Card.Title>
            <Card.Text>
              <LockFill size={96} />
            </Card.Text>
          </Card.Body>
        </ClickableCard>
        <ClickableCard onClick={() => history.push(Routes.MANAGE_TRIBES)}>
          <Card.Body>
            <Card.Title>Manage Wells</Card.Title>
            <Card.Text>
              <p
                style={{ fontSize: 96, padding: 0, margin: 0, marginTop: -20 }}
              >
                💦
              </p>
            </Card.Text>
          </Card.Body>
        </ClickableCard>
      </CardDeck>
    </>
  );
};

export default CardView;
