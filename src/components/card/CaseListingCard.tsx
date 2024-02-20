import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CaseListingCardProps {
  caseItem: TCase
  tokenId: string
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'In Progress':
      return 'text-yellow-700 bg-yellow-200 border-yellow-500 dark:text-yellow-800'
    case 'Resolved':
      return 'text-green-800 bg-green-500/50 border-green-500 dark:text-green-200'
    case 'New':
      return 'bg-purple-300 text-purple-600 dark:text-purple-600  border-purple-500'
    default:
      return 'bg-gray-500 '
  }
}

const CaseListingCard = ({ caseItem, tokenId }: CaseListingCardProps) => {
  return (
    <Link
      href={`/court/cases/${`${tokenId}-${caseItem?.caseId}`}`}
      className='group border p-3 rounded-lg '
    >
      <div className='flex flex-col gap-2 justify-between h-full  '>
        <div className='relative overflow-hidden h-56 rounded-lg'>
          <Image
            src='https://static.vecteezy.com/system/resources/thumbnails/011/231/538/small/abstract-geometric-background-with-isometric-digital-blocks-blockchain-concept-and-modern-technology-illustration-free-vector.jpg'
            unoptimized
            alt='Case Image'
            fill
            className='object-cover w-full   cursor-pointer transition-all duration-300 transform group-hover:scale-110'
          />
        </div>

        <h3 className='text-lg font-semibold text-primary'>
          {caseItem?.plaintiff.name} Vs {caseItem?.defendant.name}
        </h3>
        <p className='text-sm text-gray-400'>
          <span className='font-semibold'>Case ID</span> {caseItem?.caseId}
        </p>
        <p className='text-sm text-gray-400'>
          <span
            className={`inline-block px-3 text-xs font-semibold py-1 border rounded-full ${getStatusColor(caseItem?.status)}`}
          >
            {caseItem?.status}
          </span>
        </p>

        <p className='text-sm text-gray-400'>{caseItem?.caseCreatedAt}</p>
      </div>
    </Link>
  )
}

export default CaseListingCard
