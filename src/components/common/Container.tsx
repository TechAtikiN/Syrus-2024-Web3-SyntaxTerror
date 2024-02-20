import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="flex flex-col min-h-screen gap-8 p-8">{children}</div>;
};

export default Container;