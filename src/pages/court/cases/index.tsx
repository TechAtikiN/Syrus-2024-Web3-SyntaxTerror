import CaseListing from "@/components/cases/CaseListing";
import Heading from "@/components/common/Heading";
import React from "react";

const CasesPage = () => {
  return (
    <div className="page-container">
      <Heading title="Case Listing" />

      <CaseListing />
    </div>
  );
};

export default CasesPage;
