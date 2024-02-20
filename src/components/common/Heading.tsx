import React from "react";

const Heading = ({ title }: { title: string }) => {
  return <div className="text-2xl font-semibold uppercase">{title}</div>;
};

export default Heading;