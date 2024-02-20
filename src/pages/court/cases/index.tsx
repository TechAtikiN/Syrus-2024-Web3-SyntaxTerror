import CaseListing from '@/components/cases/CaseListing'

import Link from 'next/link';
import React from 'react';

const CasesPage = () => {
  return (
    <div className='page-container'>
      <h3 className='heading pb-4'>Case Listing</h3>
      <CaseListing />
    </div>
  );
};

export default CasesPage;
