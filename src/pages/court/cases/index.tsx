import CaseListing from '@/components/cases/CaseListing'
import React from 'react';

const CasesPage = () => {
  return (
    <div className='page-container'>
      <h1 className='heading'>Case Listing</h1>

      <CaseListing />
    </div>
  );
};

export default CasesPage;
