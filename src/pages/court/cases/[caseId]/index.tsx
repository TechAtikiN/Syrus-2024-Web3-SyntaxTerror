import { useRouter } from 'next/router'
import React from 'react'

const CaseDetailsPage = () => {
  const router = useRouter()
  const { caseId } = router.query

  return (
    <div className='page-container'>
      <h1 className='heading'><span>Case Details</span></h1>

      <div className='grid grid-cols-7 gap-x-5'>
        <div className='col-span-3'>
          <div></div>
        </div>
        <div className='col-span-4'>

        </div>
      </div>
    </div>
  )
}

export default CaseDetailsPage