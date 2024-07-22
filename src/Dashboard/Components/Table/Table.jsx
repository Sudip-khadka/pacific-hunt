import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table({ data, selectedRows, onCheckboxChange, onSelectAll }) {
  return (
    <div className='w-full p-[20px]'>
      <TableHeader />
      <TableBody
        data={data}
        selectedRows={selectedRows}
        onCheckboxChange={onCheckboxChange}
        onSelectAll={onSelectAll}
      />
    </div>
  );
}

export default Table;
