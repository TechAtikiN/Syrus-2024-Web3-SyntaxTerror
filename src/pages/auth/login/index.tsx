import { contractAddress } from "@/util/checkBalance";
import {
  ConnectEmbed,
  useAddress,
  useContract,
  useContractMetadata,
  useOwnedNFTs,
  useShowConnectEmbed,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LoginPage = () => {
  const showConnectWallet = useShowConnectEmbed();
  const CONTRACT_ADDRESS = "0xDC94e1E6333d3c602a86f08282117d9a871694C2";

  const address = useAddress();
  const router = useRouter();

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: lawyerNFTs, isLoading: lawyerNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  const { data: courtNFTs, isLoading: courtNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  console.log(lawyerNFTs, courtNFTs);


  useEffect(() => {
    if (address) {
      if (!lawyerNFTsLoading && lawyerNFTs && lawyerNFTs[0]?.metadata.name === "Token Access") {
        router.push("/lawyer");
      } 
      if (!courtNFTsLoading && courtNFTs && courtNFTs[0]?.metadata.name === "Court") {
        router.push("/court");
      } 
      if (lawyerNFTs?.length === 0 && courtNFTs?.length === 0) {
        router.push("/auth/mint");
      }
    }
  }, [router, address, lawyerNFTs, courtNFTs, lawyerNFTsLoading, courtNFTsLoading]);



  return (
    <div>
      <h3 className="text-2xl font-bold">Login</h3>
      {showConnectWallet ? (
        <ConnectEmbed
          auth={{
            loginOptional: false,
            onLogin() {
              console.log("Logged in");
   

            },
            onLogout() {
              console.log("Logged out");
              
            },
          }}
        />
      ) : (
        <div>Signing in...</div>
      )}
    </div>
  );
};

export default LoginPage;
