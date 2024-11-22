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

function UserProfile() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const employeerDetail = localStorage.getItem("user");
    if (employeerDetail) {
      try {
        setDetails(JSON.parse(employeerDetail));
      } catch (error) {
        console.error("Error parsing employeerDetail:", error);
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
          {/* Static fields */}
          {[
            { id: 1, title: "Name", detail: details.username },
            { id: 2, title: "Email", detail: details.email },
            { id: 3, title: "Phone", detail: details.phone },
            { id: 4, title: "Date Of Birth", detail: details.dateOfBirth },
            { id: 5, title: "Skills", detail: details.skills.join(", ") },
            { id: 6, title: "Address", detail: details.address },
          ].map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.detail}</TableCell>
            </TableRow>
          ))}

          {/* Education field */}
          {details.education.map((edu, index) => (
            <TableRow key={`education-${edu.id}`}>
              <TableCell>{6 + index + 1}</TableCell>
              <TableCell>Education {index + 1}</TableCell>
              <TableCell>
                <strong>Title:</strong> {edu.title}
                <br />
                <strong>College:</strong> {edu.college}
                <br />
                <strong>Started:</strong> {edu.started}
                <br />
                <strong>Ended:</strong> {edu.ended || "Ongoing"}
              </TableCell>
            </TableRow>
          ))}

          {/* Experience field */}
          {details.experience.map((exp, index) => (
            <TableRow key={`experience-${exp.id}`}>
              <TableCell>{6 + details.education.length + index + 1}</TableCell>
              <TableCell>Experience {index + 1}</TableCell>
              <TableCell>
                <strong>Title:</strong> {exp.title}
                <br />
                <strong>Company:</strong> {exp.company}
                <br />
                <strong>Duration:</strong> {exp.experience}
                <br />
                <strong>Description:</strong> {exp.description}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </JobSeekersContainer>
  );
}


export default UserProfile;
