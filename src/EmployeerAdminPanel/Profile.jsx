import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const JobSeekersContainer = styled.div`
  margin-left: 264px;
  padding: 20px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 10px;
  }

  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 10px;
  text-align: left;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  &.email-cell {
    word-break: break-word;
    white-space: normal;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

function Profile() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const employeerDetail = localStorage.getItem('employeerDetail');
    if (employeerDetail) {
      try {
        setDetails(JSON.parse(employeerDetail));
      } catch (error) {
        console.error('Error parsing employeerDetail:', error);
      }
    }
  }, []);

  if (!details) {
    return <p>Loading profile details...</p>;
  }

  return (
    <JobSeekersContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>S.N</TableHeader>
            <TableHeader>Titles</TableHeader>
            <TableHeader>Details</TableHeader>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, title: 'Name', detail: details.companyName },
            { id: 2, title: 'Email', detail: details.companyEmail },
            { id: 3, title: 'Phone', detail: details.companyPhone },
            {
              id: 4,
              title: 'Logo',
              detail: details.companyLogo ? (
                <img
                  src={details.companyLogo}
                  alt="Company Logo"
                  style={{ width: '30px', height: 'auto', borderRadius: '5px' }}
                />
              ) : (
                'No logo available'
              ),
            },
            { id: 5, title: 'Website URL', detail: details.websiteUrl },
            { id: 6, title: 'Address', detail: details.companyAddress },
          ].map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.detail}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </JobSeekersContainer>
  );
}

export default Profile;
