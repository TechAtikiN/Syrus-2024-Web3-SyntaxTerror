import LoginLoader from "@/components/loader/LoginLoader";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  ConnectWallet,
  useShowConnectEmbed,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

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
      if (
        !lawyerNFTsLoading &&
        lawyerNFTs &&
        lawyerNFTs[0]?.metadata.name === "Token Access"
      ) {

        router.push("/lawyer");
      }
      if (
        !courtNFTsLoading &&
        courtNFTs &&
        courtNFTs[0]?.metadata.name === "Court"
      ) {

        router.push("/court");
      }
      if (lawyerNFTs?.length === 0 && courtNFTs?.length === 0) {
        router.push("/auth/mint");
      }
    }
  }, [
    router,
    address,
    lawyerNFTs,
    courtNFTs,
    lawyerNFTsLoading,
    courtNFTsLoading,
  ]);

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
      <div className="flex flex-col gap-3 items-center w-full h-full  justify-center">
        <Image src="/logo/logo.png" alt="Nyay Setu" width={400} height={400} />

        {showConnectWallet ? (
          <ConnectWallet
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
          <LoginLoader />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
