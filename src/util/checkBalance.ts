import { ThirdwebSDK, detectFeatures } from "@thirdweb-dev/sdk";


export const contractAddress =  "0xDC94e1E6333d3c602a86f08282117d9a871694C2";


export const domainName = "thirdweb-example.com";
export const minimumBalance = 1;
export const erc1155TokenId = 0;

// @ts-ignore
export default async function checkBalance(sdk: ThirdwebSDK, address: string) {
  const contract = await sdk.getContract(
   contractAddress
  );

 const balance = await contract.erc1155.balanceOf(address, erc1155TokenId);

 return balance;
}
