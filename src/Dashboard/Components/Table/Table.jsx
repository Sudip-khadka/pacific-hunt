import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";

function Table({
  data,
  selectedRows,
  onCheckboxChange,
  onSelectAll,
  refetchData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [spotlight, setSpotlight] = useState('');
  
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = data.filter(item => {
      const itemDate = new Date(item.createdAt);
      const isWithinDateRange = (!startDate || itemDate >= startDate) &&
                                (!endDate || itemDate <= endDate);
      const matchesSpotlight = spotlight === '' || 
                               (spotlight === 'popularCategory' && item.isPopularCategory);

      return (item.category.toLowerCase().includes(lowercasedQuery) ||
              item.createdAt.toLowerCase().includes(lowercasedQuery)) &&
              isWithinDateRange &&
              matchesSpotlight;
    });

    // Apply sorting if a sort order is set
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.category.localeCompare(b.category);
        } else {
          return b.category.localeCompare(a.category);
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page on search or filter change
  }, [searchQuery, startDate, endDate, data, sortOrder, spotlight]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
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
  const handleSpotlight =  (value) => setSpotlight(value);

  // Calculate the data to be displayed for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="w-full p-[20px]">
      <TableHeader
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSearch={handleSearch}
        onDateFilter={handleDateFilter}
        onSort={handleSort}
        onSpotlight={handleSpotlight}
      />
      <TableBody
        data={paginatedData}
        selectedRows={selectedRows}
        onCheckboxChange={onCheckboxChange}
        onSelectAll={onSelectAll}
        refetchData={refetchData} // Pass refetch function
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / rowsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Table;
