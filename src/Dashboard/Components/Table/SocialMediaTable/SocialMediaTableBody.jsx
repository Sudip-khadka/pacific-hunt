import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from '../../Switch'
import UpdateProfession from '../../PopUps/UpdateProfession';
import UpdateSocialMedia from '../../PopUps/UpdateSocialMedia';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  padding: 20px !important;
  thead {
    height: 48px;
    border-radius: 4px;
    background: var(--Neutral-Grey-50, #F5F6F6);
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  @media(max-width: 768px) {
    overflow-x: scroll;
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
`;

const StyledTr = styled.tr`
  height: 60px;
  &:hover {
    background-color: ${({ $isDisabled }) => ($isDisabled ? '#f0f0f0' : '#ddd')};
  }
`;

function SocialMediaTableBody({ data, selectedRows, onCheckboxChange, onSelectAll, onSwitchToggle,refetchData ,currentPage, rowsPerPage  }) {
  // Initialize switch states based on the isActiveCategory property
  const [switchStates, setSwitchStates] = useState({});
  useEffect(() => {
    // Initialize switch states based on the data
    if (data) {
      setSwitchStates(
        data.reduce((acc, item) => {
          acc[item.id] = item.isActiveMedia;
          return acc;
        }, {})
      );
    }
  }, [data]); // Re-run this effect when `data` changes

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);

  const handleToggle = (id, isOn) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [id]: isOn
    }));
    if (onSwitchToggle) onSwitchToggle(id, isOn); // Notify parent about the switch change
  };
  const handleEditClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
    setOpenUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setSelectedSocialMedia(null);
  };

  const handleSocialMediaUpdate = () => {
    // Refetch data after the category is updated
    refetchData();
    handleUpdateDialogClose();
  };

  const handleSelectAll = () => {
    const currentRows = data.map((item) => item.id);
    if (selectedRows.length === data.length) {
      onSelectAll([]); // Deselect all if already selected
    } else {
      onSelectAll(currentRows); // Select only the current page's rows
    }
  };
  return (
    <><TableContainer>
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
          <StyledTh>Social Media Name</StyledTh>
          <StyledTh>Icon</StyledTh>
          <StyledTh>Url</StyledTh>
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
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.socialMediaName}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}> <div className='radius-xl'><img width="48px" src={item.socialMediaImage} alt={item.socialMediaName} /></div> </StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.socialMediaUrls}</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>{item.createdAt}</StyledTd>
            
            <StyledTd $isDisabled={!switchStates[item.id]} onClick={()=>handleEditClick(item)}>Edit</StyledTd>
            <StyledTd $isDisabled={!switchStates[item.id]}>
              <Switch
                isOn={switchStates[item.id]}
                onToggle={(isOn) => handleToggle(item.id, isOn)}
              />
            </StyledTd>
          </StyledTr>
        ))}
      </tbody>
    </StyledTable></TableContainer>
    {selectedSocialMedia && (
        <UpdateSocialMedia
        title="Update Social Media"
          open={openUpdateDialog}
          onClose={handleUpdateDialogClose}
          onSubmit={handleSocialMediaUpdate}
          socialMedia={selectedSocialMedia}
        />
      )}
    </>
  );
}

export default SocialMediaTableBody;
