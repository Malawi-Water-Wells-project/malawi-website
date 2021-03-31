import React, { HTMLProps, KeyboardEvent } from "react";
import { Card, CardProps } from "react-bootstrap";

const ClickableCard: React.FC<CardProps & HTMLProps<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <Card
    tabIndex={0}
    className={className ? `card-link ${className}` : "card-link"}
    onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") e.currentTarget.click();
    }}
    {...rest}
  />
);

export default ClickableCard;
