import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const PaginationButton = styled.button`
  margin: 0 4px;
  padding: 8px 12px;
  background: ${({ disabled }) => (disabled ? '#ddd' : '#007bff')};
  color: white;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ disabled }) => (disabled ? '#ddd' : '#0056b3')};
  }
`;

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <PaginationContainer>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </PaginationButton>
      {[...Array(totalPages).keys()].map((_, index) => (
        <PaginationButton
          key={index + 1}
          disabled={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </PaginationButton>
      ))}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
}

export default Pagination;
