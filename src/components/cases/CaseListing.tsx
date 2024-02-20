import DashboardLoader from "../loader/DashboardLoader";
import CaseListingCard from "../card/CaseListingCard";
import { useContract, useNFTs, useOwnedNFTs } from "@thirdweb-dev/react";

const CaseListing = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { data: caseNfts, isLoading: isCaseNftsLoading, isError } = useNFTs(contract)

  if (isCaseNftsLoading) {
    return <DashboardLoader />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {caseNfts?.map((caseItem, index) => (

        (index < 3 )&& <CaseListingCard key={index} tokenId={caseItem?.metadata?.id} caseItem={caseItem?.metadata?.properties as TCase} />
      ))}
    </div>
  );
};

export default CaseListing;
