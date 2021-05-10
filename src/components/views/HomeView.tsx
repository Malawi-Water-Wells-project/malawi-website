import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";
import { PeopleFill, LockFill } from "react-bootstrap-icons";
import ClickableCard from "../components/ClickableCard";
import { AppBreadcrumbs, Routes } from "../../core/Constants";
import useBreadcrumbs from "../../hooks/UseBreadcrumbs";

const CardView: React.FC = () => {
  const history = useHistory();
  useBreadcrumbs(AppBreadcrumbs.HOME);

  return (
    <>
      <CardDeck>
        <ClickableCard
          className="fade-in"
          onClick={() => history.push(Routes.MANAGE_TRIBES)}
        >
          <Card.Body>
            <Card.Title>Manage Tribes</Card.Title>
            <Card.Text>
              <PeopleFill size={96} />
            </Card.Text>
          </Card.Body>
        </ClickableCard>
        <ClickableCard
          className="fade-in"
          onClick={() => history.push(Routes.MANAGE_TRIBES)}
        >
          <Card.Body>
            <Card.Title>Manage Accounts</Card.Title>
            <Card.Text>
              <LockFill size={96} />
            </Card.Text>
          </Card.Body>
        </ClickableCard>
        <ClickableCard
          className="fade-in"
          onClick={() => history.push(Routes.MANAGE_WELLS)}
        >
          <Card.Body>
            <Card.Title>Manage Wells</Card.Title>
            <Card.Text
              style={{ fontSize: 96, padding: 0, margin: 0, marginTop: -20 }}
            >
              💦
            </Card.Text>
          </Card.Body>
        </ClickableCard>
      </CardDeck>
    </>
  );
};

export default CardView;
