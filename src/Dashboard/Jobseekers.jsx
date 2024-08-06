import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteBtn from '../Components/DeleteBtn';
import ConfirmationDialog from '../Components/ConfirmationDialog';

const JobSeekersContainer = styled.div`
  margin-left: 264px;
  padding: 20px;

  @media(max-width: 768px) {
    margin: 0;
    padding: 10px;
  }
`;

const SearchBar = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width:300px;
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

  @media(max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  font-size: 16px;

  @media(max-width: 768px) {
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

const jobSeekerUsers = 'https://retoolapi.dev/iVQngS/jobSeeker';

function Jobseekers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowConfirmation(true);
  };

  const confirmDeletion = () => {
    if (userIdToDelete !== null) {
      setIsDeleting(true);
      fetch(`${jobSeekerUsers}/${userIdToDelete}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          // Remove user from local state if deletion is successful
          const updatedUsers = users.filter(user => user.id !== userIdToDelete);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          setUserIdToDelete(null);
          setIsDeleting(false);
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch(error => console.error('Error deleting user:', error))
      .finally(() => {
        setShowConfirmation(false);
        setIsDeleting(false);
      });
    }
  };

  const cancelDeletion = () => {
    setUserIdToDelete(null);
    setShowConfirmation(false);
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
              <TableCell className="email-cell">{user.email}</TableCell>
              <TableCell>
                <DeleteBtn onClick={() => handleDeleteClick(user.id)} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message={isDeleting ? "Please wait, your rows are being deleted..." : "Are you sure you want to delete this user?"}
      />
    </JobSeekersContainer>
  );
}

export default Jobseekers;
