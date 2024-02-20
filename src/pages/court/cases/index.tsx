import CaseListing from '@/components/cases/CaseListing'

import Link from 'next/link';
import React from 'react';

const CasesPage = () => {
  return (
    <div className='page-container'>
      <div className='flex items-center justify-between'>
        <h3 className='heading'>Case Listing</h3>
        <Link
          href='/court/cases/create'
          className='bg-primary text-white px-4 py-2 rounded-md'
        >
          Create new case
        </Link>
      </div>
      <CaseListing />
    </div>
  );
};

export default CasesPage;
