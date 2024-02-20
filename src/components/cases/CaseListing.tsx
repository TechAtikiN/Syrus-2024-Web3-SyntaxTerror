import React, { use } from "react";
import DashboardLoader from "../loader/DashboardLoader";
import CaseListingCard from "../card/CaseListingCard";
import { useAddress, useContract, useNFTs, useOwnedNFTs } from "@thirdweb-dev/react";

const CaseListing = () => {
  const cases = [
    {
      title: "Smith v. Johnson",
      caseId: "SC-2024-001",
      status: "Pending",
      date: "2024-02-20",
      plaintiffName: "Emily Smith",
    },
    {
      title: "Brown v. White",
      caseId: "FC-2023-102",
      status: "Settled",
      date: "2023-10-15",
      plaintiffName: "Michael Brown",
    },
    {
      title: "Jones v. Garcia",
      caseId: "JG-2024-003",
      status: "Pending",
      date: "2024-01-10",
      plaintiffName: "Sophia Jones",
    },
    {
      title: "Williams v. Davis",
      caseId: "WD-2023-104",
      status: "Pending",
      date: "2023-11-05",
      plaintiffName: "Daniel Williams",
    },
    {
      title: "Martinez v. Anderson",
      caseId: "MA-2024-005",
      status: "Settled",
      date: "2024-02-10",
      plaintiffName: "Jessica Martinez",
    },
    {
      title: "Taylor v. Lee",
      caseId: "TL-2023-106",
      status: "Settled",
      date: "2023-09-20",
      plaintiffName: "Matthew Taylor",
    },
    {
      title: "Clark v. Hall",
      caseId: "CH-2024-007",
      status: "Pending",
      date: "2024-01-30",
      plaintiffName: "Ava Clark",
    },
    {
      title: "Rodriguez v. Lewis",
      caseId: "RL-2023-108",
      status: "Settled",
      date: "2023-12-15",
      plaintiffName: "David Rodriguez",
    },
    {
      title: "Hernandez v. Young",
      caseId: "HY-2024-009",
      status: "Pending",
      date: "2024-03-05",
      plaintiffName: "Isabella Hernandez",
    },
    {
      title: "Gonzalez v. Baker",
      caseId: "GB-2023-110",
      status: "Pending",
      date: "2023-11-20",
      plaintiffName: "Christopher Gonzalez",
    },
  ];

  const { contract } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { data: caseNfts, isLoading: isCaseNftsLoading, isError } = useNFTs(contract)

    if (isCaseNftsLoading) {
        return <DashboardLoader />
    }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {caseNfts?.map((caseItem, index) => (
        <CaseListingCard key={index} caseItem={caseItem?.metadata?.properties as TCase } />
      ))}
    </div>
  );
};

export default CaseListing;
