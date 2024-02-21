import { useRouter } from 'next/router'
import { useContract, useNFT } from '@thirdweb-dev/react'
import Image from 'next/image'
import ProgressTracker from '@/components/court/caseDetails/ProgressTracker'
import UpdateCase from '@/components/court/caseDetails/UpdateCase'
import Link from 'next/link'
import DashboardLoader from '@/components/loader/DashboardLoader'

const Heading = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 my-3">
      <div className='bg-primary h-7 w-2 rounded-lg' />
      <h4 className='text-xl font-bold '>{title}</h4>
    </div>
  )
}

const CaseDetailsPage = () => {
  const router = useRouter()
  const { caseId } = router.query
  const token = caseId?.toString().split('-')[0]

  const { contract: caseCollection } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { data: nft, isLoading, error } = useNFT(caseCollection, token)
  // @ts-ignore
  const caseDetails = nft?.metadata?.properties
  console.log(caseDetails)
  if (isLoading) return <DashboardLoader />


  return (
    <div className='page-container'>
      <div className='flex justify-between '>
        <h1 className='heading'><span>Case Details</span></h1>
        <UpdateCase caseDetails={caseDetails} token={token!} />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 my-5'>
        <div className='space-y-6'>

          <div className='relative h-[400px] w-full rounded-md  '>
            <Image src={'/case.png'} alt='Case Image' fill className='object-cover rounded-lg' />
          </div>

          <Heading title='Case Description' />

          {/* @ts-ignore */}
          <p className='text-sm md:text-base text-justify'>{caseDetails?.caseDescription}</p>
          <div className=' mt-5 flex justify-between'>
            {/* @ts-ignore */}
            <p>Created At: <span className='font-bold'>{new Date(caseDetails?.caseCreatedAt).toDateString()}</span></p>
            {/* @ts-ignore */}
            <p>Status:&nbsp;<span className='font-bold'>{caseDetails?.status}</span></p>
          </div>

        </div>
        <div className=''>
          <div className='space-y-4'>
            {/* @ts-ignore */}
            <ProgressTracker status={caseDetails?.status} />
            <div className='border p-3 rounded-md felx flex-col '>
              <Heading title='Case Details' />
              <div>


                <h4 className='text-lg font-semibold underline'> Plaintiff Details</h4>


                <div className='gap-y-2 grid grid-cols-1 lg:grid-cols-2 py-2'>
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
                <div className='gap-y-2 grid grid-cols-1 lg:grid-cols-2 py-2'>
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

                <div className='gap-y-2 grid grid-cols-1 lg:grid-cols-2 py-2'>
                  <div className='flex space-x-1'>
                    <p className='font-bold'>Plaintiff:</p>
                    {/* @ts-ignore */}
                    <Link className='text-primary font-semibold underline' href={`${caseDetails?.plaintiff?.plaint[0]}`}>View Document</Link>
                  </div>
                  <div className='flex space-x-1'>
                    <p className='font-bold'>Claim:</p>
                    {/* @ts-ignore */}
                    <Link className='text-primary font-semibold underline' href={`${caseDetails?.defendant?.claim[0]}`}>View Document</Link>
                  </div>
                  <div className='flex space-x-1'>
                    <p className='font-bold'>Summon:</p>
                    {/* @ts-ignore */}
                    <Link className='text-primary font-semibold underline' href={`${caseDetails?.defendant?.summon[0]}`}>View Document</Link>
                  </div>
                  <div className='flex space-x-1'>
                    <p className='font-bold'>Documents:</p>
                    {/* @ts-ignore */}
                    <Link className='text-primary font-semibold underline' href={`${caseDetails?.additionalDocuments}`}>View Document</Link>
                  </div>

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