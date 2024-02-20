import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import checkBalance, { contractAddress } from "@/util/checkBalance";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useEffect } from "react";
import { getUser } from "../api/auth/[...thirdweb]";
import {
  useAddress,
  useClaimedNFTSupply,
  useClaimedNFTs,
  useContract,
  useContractMetadata,
  useOwnedNFTs,
  useUser,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const LawyerPage = () => {
  // const { isLoggedIn, isLoading } = useUser();
  // const router = useRouter();
  // // const { contract } = useContract(contractAddress);
  // // const { data: contractMetadata, isLoading: contractLoading } =
  // // useContractMetadata(contract);
  // const address = useAddress();

  // useEffect(() => {
  //   if (!isLoading && !isLoggedIn) {
  //     router.push("/auth/login");
  //   }
  // }, [isLoading, isLoggedIn, router]);
  return (
    <Container>
      <Heading title="Lawyer" />
      <h3 className="text-2xl font-bold">You have access!</h3>
    </Container>
  );
};

export default LawyerPage;

