import React from 'react';

function ProfessionTableBody({ data, columns, selectedRows, onCheckboxChange, onSelectAll, refetchData }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {/* Dynamically generate headers */}
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {/* Dynamically render rows based on columns */}
            {columns.map(col => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProfessionTableBody;
