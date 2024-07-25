import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom:10px;
`;

const RowsPerPageSelect = styled.select`
  height: 40px;
  width: 80px;
  margin: 8px;
  padding: 5px;
  border-radius: 6px;
  border: 1px solid var(--Neutral-Grey-200, #DBDBDC);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  width: 200px;
  color: rgba(107, 109, 111, 1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
`;

const DateFilterContainer = styled.div`
  display: flex;
width: 264px;
padding: 8px 12px;
justify-content: center;
align-items: flex-start;
gap: 10px;
border-radius: 4px;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
`;

const CalendarIcon = styled(FaCalendarAlt)`
  color: #888;
`;

const StyledDatePicker = styled(DatePicker)`
width:191px;
  color: var(--Neutral-Grey-500, #6B6D6F);
text-align: center;

/* Body/Medium/Regular */
font-family: "Be Vietnam Pro";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding:0 14px;
  border-radius: 4px;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
`;

const SortLabel = styled.span`
  font-weight: 500;
  color: var(--Neutral-Grey-900, #3C3D3D);
  padding-right:8px;
  border-right:2px solid #D0D1D1;
`;

const SortSelect = styled.select`
  height: 40px;
  padding: 5px;
  font-size: 14px;
`;
const SpotLightContainer = styled.div`
display:flex;
align-items:center;
  border-radius: 4px;
border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
padding:0 10px;
`
const SpotLight = styled.select`
color: var(--Neutral-Grey-500, #6B6D6F);
text-align: center;
font-family: "Be Vietnam Pro";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
`

function ProfessionTableHeader({ rowsPerPage, onRowsPerPageChange, onSearch, onDateFilter, onSort, onSpotlight, spotlightOptions, sortOptions }) {
  
  return (
    <HeaderContainer>
      {/* Render header elements */}
      {spotlightOptions && (
        <SpotLight onChange={handleSpotlightChange}>
          <option value="">Spotlight</option>
          {spotlightOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </SpotLight>
      )}
      <SortContainer>
        <SortLabel>Sort By:</SortLabel>
        <SortSelect onChange={handleSortChange}>
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </SortSelect>
      </SortContainer>
    </HeaderContainer>
  );
}

export default ProfessionTableHeader;
