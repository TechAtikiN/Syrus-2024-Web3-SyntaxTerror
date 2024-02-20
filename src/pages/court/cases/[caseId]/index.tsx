import Heading from '@/components/common/Heading'
import { useRouter } from 'next/router'
import React from 'react'

const CaseDetailsPage = () => {
  const router = useRouter()
  const { caseId } = router.query
  
  return (
    <div className='page-container'>
      <Heading title='Case Details' />
      <div className='text-2xl font-bold'>Case ID: {caseId}</div>
      
    </div>
  )
}

export default CaseDetailsPage