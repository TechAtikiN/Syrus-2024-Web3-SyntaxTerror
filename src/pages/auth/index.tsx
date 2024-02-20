import checkBalance from "@/util/checkBalance";
import { ConnectWallet, ThirdwebSDK } from "@thirdweb-dev/react";
import React, { Context, ContextType } from "react";
import { getUser } from "../api/auth/[...thirdweb]";

const AuthPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold">Hello, world!</h1>
      <ConnectWallet />
    </div>
  );
};

export default AuthPage;

export async function getServerSideProps(context: any) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const secretKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;

  if (!secretKey) {
    console.log("Missing env var: TW_SECRET_KEY");
    throw new Error("Missing env var: TW_SECRET_KEY");
  }

  const PRIVATE_KEY = process.env.NEXT_PUBLIC_THIRDWEB_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "mumbai", {
    secretKey,
  });

  const tokenBalance = await checkBalance(sdk, user.address);

  if (tokenBalance.toNumber() === 0) {
    return {
      redirect: {
        destination: "/auth/mint",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
