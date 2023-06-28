import React, { FunctionComponent } from "react";

type Props = {
  condition: boolean | undefined;
  children: React.ReactNode;
};

const Show: FunctionComponent<Props> = ({ condition, children }) => {
  if (condition === true) return <>{children}</>;
  return null;
};

export default Show;
