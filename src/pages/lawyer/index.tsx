import CaseListingCard from '@/components/card/CaseListingCard'
import Container from '@/components/common/Container'
import DashboardLoader from '@/components/loader/DashboardLoader'
import { useAddress, useContract, useNFTs } from '@thirdweb-dev/react'

import React, { useEffect, useState } from 'react'

const LawyerPage = () => {
  const address = useAddress()
  const { contract } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { data: caseNfts, isLoading: isCaseNftsLoading, isError } = useNFTs(contract)

  if (isCaseNftsLoading) {
    return <DashboardLoader />
  }

  const userCases = caseNfts?.filter((caseItem) =>
    // @ts-ignore
    caseItem?.metadata?.properties?.defendant?.lawyerWalletAddress === address ||
    // @ts-ignore
    caseItem?.metadata?.properties?.plaintiff?.lawyerWalletAddress === address
  )

  return (
    <div className='flex flex-col gap-4 min-h-screen space-y-3'>
      <h1 className='heading'>Lawyer Dashboard</h1>
      {/* <h3 className='text-2xl font-bold'>You have access!</h3> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3'>
        {userCases && userCases?.length > 0 ? userCases?.map((caseItem, index) => (
          // @ts-ignore
          <CaseListingCard key={index} tokenId={caseItem?.metadata?.id} caseItem={caseItem?.metadata?.properties as TCase} />
        )) : (
          <div className='w-full col-span-4'>
            <p className='flex flex-col text-primary text-xl justify-center my-64 mx-auto items-center'>No cases found where you are involved!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LawyerPage

