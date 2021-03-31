import React, { HTMLProps } from "react";

const ReadingWidth: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    className={className ? `reading-width ${className}` : "reading-width"}
    {...rest}
  />
);

export default ReadingWidth;
