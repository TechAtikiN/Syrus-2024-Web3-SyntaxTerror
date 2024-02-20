import { useRouter } from 'next/router'
import { useContract, useNFT } from '@thirdweb-dev/react'
import Image from 'next/image'
import ProgressTracker from '@/components/court/caseDetails/ProgressTracker'
import UpdateCase from '@/components/court/caseDetails/UpdateCase'
import Link from 'next/link'

const CaseDetailsPage = () => {
  const router = useRouter()
  const { caseId } = router.query
  const token = caseId?.toString().split('-')[0]

  const { contract: caseCollection } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { data: nft, isLoading, error } = useNFT(caseCollection, token)
  // @ts-ignore
  const caseDetails = nft?.metadata?.properties
  console.log('caseDetails', caseDetails)
  return (
    <div className='page-container'>
      <div className='flex justify-between'>
        <h1 className='heading'><span>Case Details</span></h1>
        <UpdateCase caseDetails={caseDetails} token={token!} />
      </div>
      <div className='sm:grid sm:grid-cols-7 gap-x-10 my-5'>
        <div className='col-span-3'>
          <div>
            <div className='relative h-[365px] w-[525px]'>
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
            <div className='border p-3 rounded-md'>
              <h4 className='text-xl my-3 font-bold'>Case Details:</h4>
              <div>
                <h4 className='text-lg font-semibold underline'>Plaintiff Details</h4>
                <div className='gap-y-2 grid grid-cols-2 py-2'>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Name:</span>&nbsp;{caseDetails?.plaintiff?.name}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Phone:</span>&nbsp;{caseDetails?.plaintiff?.contact}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Email:</span>&nbsp;{caseDetails?.plaintiff?.email}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Lawyer Name:</span>&nbsp;{caseDetails?.plaintiff?.lawyerName}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Lawyer Email:</span>&nbsp;{caseDetails?.plaintiff?.lawyerEmail}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Address:</span>&nbsp;{caseDetails?.plaintiff?.address}</p>
                </div>
              </div>

              <div>
                <h4 className='text-lg font-semibold underline'>Defendant Details</h4>
                <div className='gap-y-2 grid grid-cols-2 py-2'>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Name:</span>&nbsp;{caseDetails?.defendant?.name}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Phone:</span>&nbsp;{caseDetails?.defendant?.contact}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Email:</span>&nbsp;{caseDetails?.defendant?.email}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Lawyer Name:</span>&nbsp;{caseDetails?.defendant?.lawyerName}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Lawyer Email:</span>&nbsp;{caseDetails?.defendant?.lawyerEmail}</p>
                  {/* @ts-ignore */}
                  <p><span className='font-bold'>Address:</span>&nbsp;{caseDetails?.defendant?.address}</p>
                  {/* @ts-ignore */}
                </div>
              </div>

              <div>
                <h4 className='text-lg font-semibold underline'>Documents</h4>
                <div className='gap-y-2 grid grid-cols-2 py-2'>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseDetailsPage