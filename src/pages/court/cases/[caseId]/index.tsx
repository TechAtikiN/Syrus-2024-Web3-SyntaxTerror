import { useRouter } from 'next/router'
import { useContract, useNFT } from '@thirdweb-dev/react'
import Image from 'next/image'
import ProgressTracker from '@/components/court/caseDetails/ProgressTracker'
import UpdateCase from '@/components/court/caseDetails/UpdateCase'

const CaseDetailsPage = () => {
  const router = useRouter()
  const { caseId } = router.query
  const token = caseId?.toString().split('-')[0]

  const { contract: caseCollection } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { data: nft, isLoading, error } = useNFT(caseCollection, token)
  // @ts-ignore
  const caseDetails = nft?.metadata?.properties

  return (
    <div className='page-container'>
      <div className='flex justify-between'>
        <h1 className='heading'><span>Case Details</span></h1>
        <UpdateCase caseDetails={caseDetails} token={token!} />
      </div>
      <div className='grid grid-cols-7 gap-x-5 my-5'>
        <div className='col-span-3'>
          <div>
            <div className='relative h-[330px] w-[480px]'>
              <Image src={'/case.png'} alt='Case Image' fill className='object-cover rounded-lg' />
            </div>
            <h4 className='text-xl font-bold text-slate-800 mt-5 my-3'>Case Description:</h4>
            {/* @ts-ignore */}
            <p>{caseDetails?.caseDescription}</p>
            <div className=' mt-5 flex justify-between'>
              {/* @ts-ignore */}
              <p>{caseDetails?.createdAt}</p>
              {/* @ts-ignore */}
              <p>Status:&nbsp;<span className='font-bold'>{caseDetails?.status}</span></p>
            </div>
          </div>
        </div>
        <div className='col-span-4'>
          <div className='space-y-4'>
            {/* @ts-ignore */}
            <ProgressTracker status={caseDetails?.status} />
            <div className='border border-slate-200 rounded-md'>
              <h4 className='text-xl my-3 p-2 font-bold'>Case Details:</h4>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseDetailsPage