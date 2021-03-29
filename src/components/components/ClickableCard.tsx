import React from "react";
import { Card, CardProps } from "reactstrap";

const ClickableCard: React.FC<CardProps> = (props) => (
  <Card
    className="card-link"
    onKeyPress={(e) => {
      if (e.key === "Enter") e.currentTarget.click();
    }}
    {...props}
  />
);

ClickableCard.defaultProps = {
  tabIndex: 0,
};

export default ClickableCard;
