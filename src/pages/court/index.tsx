import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useEffect } from "react";
import { getUser } from "../api/auth/[...thirdweb]";
import checkBalance from "@/util/checkBalance";
import { useRouter } from "next/router";
import { useAddress, useUser } from "@thirdweb-dev/react";

const CourtPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  // const { contract } = useContract(contractAddress);
  // const { data: contractMetadata, isLoading: contractLoading } =
  // useContractMetadata(contract);
  const address = useAddress();


  return <div>CourtPage</div>;
};

export default CourtPage;


