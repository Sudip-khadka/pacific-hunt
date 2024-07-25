import React from 'react';
import ProfessionTableBody from './ProfessionTableBody';
import ProfessionTableHeader from './ProfessionTableHeader';
import Pagination from './Pagination';

function ProfessionTable({
  data,
  columns,
  selectedRows,
  onCheckboxChange,
  onSelectAll,
  refetchData,
  spotlightOptions, // Conditionally used
  sortOptions
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState('');
  const [spotlightFilter, setSpotlightFilter] = React.useState('');

  React.useEffect(() => {
    let filtered = data.filter(item => {
      const itemDate = new Date(item.createdAt);
      const isWithinDateRange = (!startDate || itemDate >= startDate) &&
                                (!endDate || itemDate <= endDate);
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
             isWithinDateRange;
    });

    // Apply spotlight filter if applicable
    if (spotlightFilter === 'popular') {
      filtered = filtered.filter(item => item.isPopular); // Adjust based on your data
    }

    // Apply sorting
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, startDate, endDate, data, sortOrder, spotlightFilter]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query) => setSearchQuery(query);

  const handleDateFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleSpotlight = (filter) => {
    setSpotlightFilter(filter);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full p-[20px]">
      <ProfessionTableHeader
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSearch={handleSearch}
        onDateFilter={handleDateFilter}
        onSort={handleSort}
        onSpotlight={spotlightOptions ? handleSpotlight : undefined}
        spotlightOptions={spotlightOptions}
        sortOptions={sortOptions}
      />
      <ProfessionTableBody
        data={paginatedData}
        columns={columns}
        selectedRows={selectedRows}
        onCheckboxChange={onCheckboxChange}
        onSelectAll={onSelectAll}
        refetchData={refetchData}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / rowsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProfessionTable;
