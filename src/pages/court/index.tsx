import React from "react";
import Heading from "@/components/common/Heading";
import CaseListing from "@/components/cases/CaseListing";

const CourtPage = () => {
  return (
    <div className="page-container">
      <Heading title="Court/Staff Dashboard" />
      <CaseListing />
    </div>
  );
};

export default CourtPage;
