import React, { useState } from 'react';
import styled from 'styled-components';
import BackButton from '../Components/BackButton';
import Buttons from '../Components/Buttons';
import NoData from '../Components/NoData';
import Table from '../Components/Table/Table';
import CompanyPopup from '../Components/PopUps/CompanyTypePopup';

const CompanyContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CompanyHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: var(--Neutral-White, #FFF);
  text-align: center;
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`;

const OtherButtons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const CompanyBody = styled.div`
  display: flex;
  width: 100%;
  padding: 235px 0px 379px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--Neutral-White, #FFF);
  box-shadow: 0px 2px 4px 0px rgba(172, 188, 245, 0.25), 0px 2px 12px 0px rgba(176, 184, 211, 0.30);
`;

const data =[];
function Company() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (formData) => {
    console.log('Creating new Company:', formData);
    // Here you would typically send the data to your backend
    setIsPopupOpen(false);
  };

  const getFields = () => [
    { name: 'CompanyName', label: 'Company Name' },
    { name: 'description', label: 'Description' },
  ];

  return (
    <CompanyContainer>
      <CompanyHeader>
        <BackButton title="Company Type" />
        <OtherButtons>
          <Buttons width="257px" title="Download .xlsx Sample" type="download" iconType="download" />
          <Buttons title="Import .xlsx File" type="upload" iconType="upload" />
          <Buttons width="221px" title="Create Company" type="create" onClick={handleCreateClick} iconType="create" />
        </OtherButtons>
      </CompanyHeader>
      <CompanyBody>
      <CompanyPopup
          open={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          title="Create New Company"
          label="Company Name"
          fields={getFields()}
        />
        {data.length <= 0 && <NoData />}
        {data.length > 0 && <Table />}
      </CompanyBody>
    </CompanyContainer>
  );
}

export default Company;
