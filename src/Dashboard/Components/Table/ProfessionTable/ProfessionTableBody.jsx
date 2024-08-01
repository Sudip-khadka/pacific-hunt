import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from '../../Switch';
import UpdateProfession from '../../PopUps/UpdateProfession';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  @media(max-width: 768px) {
    overflow-x: scroll;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  padding: 20px !important;

  thead {
    height: 48px;
    border-radius: 4px;
    background: var(--Neutral-Grey-50, #F5F6F6);
  }
`;

const StyledTh = styled.th`
  padding: 8px;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-align: left;

  @media(max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const StyledTd = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  font-family: "Be Vietnam Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ $isDisabled }) => ($isDisabled ? 'rgba(175, 176, 177, 1)' : 'rgba(60, 61, 61, 1)')};

  @media(max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  &.email-cell {
    word-break: break-word;
    white-space: normal;
  }
`;

const StyledTr = styled.tr`
  height: 60px;

  &:hover {
    background-color: ${({ $isDisabled }) => ($isDisabled ? '#f0f0f0' : '#ddd')};
  }
`;

function ProfessionTableBody({ data, selectedRows, onCheckboxChange, onSelectAll, onSwitchToggle, refetchData, currentPage, rowsPerPage }) {
  const [switchStates, setSwitchStates] = useState({});

  useEffect(() => {
    if (data) {
      setSwitchStates(
        data.reduce((acc, item) => {
          acc[item.id] = item.isActiveProfession;
          return acc;
        }, {})
      );
    }
  }, [data]);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);

  const handleToggle = (id, isOn) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: isOn
    }));
    if (onSwitchToggle) onSwitchToggle(id, isOn);
  };

  const handleEditClick = (profession) => {
    setSelectedProfession(profession);
    setOpenUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setSelectedProfession(null);
  };

  const handleProfessionUpdate = () => {
    refetchData();
    handleUpdateDialogClose();
  };

  const handleSelectAll = () => {
    const currentRows = data.map((item) => item.id);
    if (selectedRows.length === data.length) {
      onSelectAll([]);
    } else {
      onSelectAll(currentRows);
    }
  };

  return (
    <>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === data.length}
                />
              </StyledTh>
              <StyledTh>S.N</StyledTh>
              <StyledTh>Category Name</StyledTh>
              <StyledTh>Created On</StyledTh>
              <StyledTh colSpan={2}>Actions</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={item.id} $isDisabled={!switchStates[item.id]}>
                <StyledTd $isDisabled={!switchStates[item.id]}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => onCheckboxChange(item.id)}
                  />
                </StyledTd>
                <StyledTd $isDisabled={!switchStates[item.id]}>{index + 1 + (currentPage - 1) * rowsPerPage}</StyledTd>
                <StyledTd $isDisabled={!switchStates[item.id]}>{item.profession}</StyledTd>
                <StyledTd $isDisabled={!switchStates[item.id]}>{item.createdAt}</StyledTd>
                <StyledTd $isDisabled={!switchStates[item.id]} onClick={() => handleEditClick(item)}>Edit</StyledTd>
                <StyledTd $isDisabled={!switchStates[item.id]}>
                  <Switch
                    isOn={switchStates[item.id]}
                    onToggle={(isOn) => handleToggle(item.id, isOn)}
                  />
                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      {selectedProfession && (
        <UpdateProfession
          title="Update Profession"
          open={openUpdateDialog}
          onClose={handleUpdateDialogClose}
          onSubmit={handleProfessionUpdate}
          profession={selectedProfession}
        />
      )}
    </>
  );
}

export default ProfessionTableBody;
