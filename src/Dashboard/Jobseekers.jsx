import React, { useEffect, useState } from 'react';
import UnderConstruction from '../UnderConstruction';
import styled from 'styled-components';
import DeleteBtn from '../Components/DeleteBtn';

const JobSeekersContainer = styled.div`
  margin-left: 264px;
  padding: 20px;
`;

const SearchBar = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const jobSeekerUsers = 'https://retoolapi.dev/iVQngS/jobSeeker';

function Jobseekers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(jobSeekerUsers)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <JobSeekersContainer>
      <SearchBar
        type="text"
        placeholder="Search by email"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Table>
        <thead>
          <tr>
            <TableHeader>S.N</TableHeader>
            <TableHeader>Full Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <DeleteBtn/>
                {/* Add action buttons or links here */}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </JobSeekersContainer>
  );
}

export default Jobseekers;
