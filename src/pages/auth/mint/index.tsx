import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
  useUser,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { use, useEffect } from "react";

const CONTRACT_ADDRESS = "0xDC94e1E6333d3c602a86f08282117d9a871694C2";

const MintPage = () => {
  const { isLoggedIn, isLoading } = useUser();
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
    <div>
      <h1>Mint</h1>
      <ConnectWallet />
      <Web3Button
        contractAddress={CONTRACT_ADDRESS}
        action={(contract) => {
          contract.erc1155.claim(0, 1);
        }}
        // onSuccess={() => router.push("/lawyer")}
      >
        Claim Lawyer NFT
      </Web3Button>
      <Web3Button
        contractAddress={CONTRACT_ADDRESS}
        action={(contract) => {
          contract.erc1155.claim(1, 1);
        }}
        // onSuccess={() => router.push("/court")}
      >
        Claim Court NFT
      </Web3Button>
    </div>
  );
};

export default MintPage;
