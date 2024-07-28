import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import JobTypeTableHeader from '../JobTypeTable/JobTypeTableHeader'
import JobTypeTableBody from "../JobTypeTable/JobTypeTableBody";
import WorkLocationTableBody from "./WorkLocationTableBody";

function WorkLocationTable({
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
  
  useEffect(() => {
    console.log("data received is ",data);
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = data.filter(item => {
      const itemDate = new Date(item.createdAt);
      const isWithinDateRange = (!startDate || itemDate >= startDate) &&
                                (!endDate || itemDate <= endDate);
      
      return (item.locationType.toLowerCase().includes(lowercasedQuery) ||
              item.createdAt.toLowerCase().includes(lowercasedQuery)) &&
              isWithinDateRange ;
    });

    // Apply sorting if a sort order is set
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.locationType.localeCompare(b.locationType);
        } else {
          return b.locationType.localeCompare(a.locationType);
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page on search or filter change
  }, [searchQuery, startDate, endDate, data, sortOrder]);

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

  
  const handleSelectAll = (currentPageRows) => {
    onSelectAll(currentPageRows);
  };


  // Calculate the data to be displayed for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="w-full p-[20px]">
      <JobTypeTableHeader
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSearch={handleSearch}
        onDateFilter={handleDateFilter}
        onSort={handleSort}
      />
      <WorkLocationTableBody
        data={paginatedData}
        selectedRows={selectedRows}
        onCheckboxChange={onCheckboxChange}
        onSelectAll={handleSelectAll}
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

export default WorkLocationTable;
