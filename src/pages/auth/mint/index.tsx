import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
  useUser,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const CONTRACT_ADDRESS = "0xDC94e1E6333d3c602a86f08282117d9a871694C2";

const MintPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const [option, setOption] = useState("");
  const router = useRouter();

  const address = useAddress();

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: lawyerNFTs, isLoading: lawyerNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  const { data: courtNFTs, isLoading: courtNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  const renderOption = (option: string) => {
    return (
      <div className="flex flex-col gap-3 items-center justify-center">
        {option === "lawyer" ? (
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={(contract) => contract.erc1155.claim(0, 1)}
            onSuccess={() => router.push("/lawyer")}
          >
            Mint Lawyer NFT
          </Web3Button>
        ) : option === "court" ? (
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={(contract) => contract.erc1155.claim(1, 1)}
            onSuccess={() => router.push("/court")}
          >
            Mint Court NFT
          </Web3Button>
        ) : null}
      </div>
    );
  };



  useEffect(() => {
    if (isLoggedIn) {
      if (lawyerNFTs && lawyerNFTs[0]?.metadata.name === "Token Access") {
        router.push("/lawyer");
      }
      if (courtNFTs && courtNFTs[0]?.metadata.name === "Court") {
        router.push("/court");
      }
    } else if (lawyerNFTs?.length === 0 && courtNFTs?.length === 0) {
      router.push("/auth/mint");
    } else if (!isLoading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }),
    [isLoggedIn, router, lawyerNFTs, courtNFTs, isLoading];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-indigo-500 h-full hidden md:block md:relative  w-full">
        <Image
          src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          className="w-full h-full object-cover"
          alt="Nyay Setu"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-3 items-center justify-center">

        <Image src="/logo/logo.png" alt="Nyay Setu" width={300} height={300} />
        <h3 className="text-xl font-semibold text-primary">
          To get started, select your role
        </h3>
        <div className="flex items-center gap-3">
          <Button onClick={() => setOption("lawyer")}>Lawyer</Button>
          <Button onClick={() => setOption("court")}>Court</Button>
        </div>


        {renderOption(option)}
      </div>
    </div>
  );
};

export default MintPage;
