import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../Components/BackButton";
import Buttons from "../Components/Buttons";
import NoData from "../Components/NoData";
import ExperienceLevelPopup from "../Components/PopUps/ExperienceLevelPopup";
import ExperienceLevelTable from "../Components/Table/ExperienceLevelTable/ExperienceLevelTable";
import DeleteBtn from "../../Components/DeleteBtn";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../Api";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import ImportFile from "../Components/ImportFile";

const ExperienceLevelContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ExperienceLevelHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: var(--Neutral-White, #fff);
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

const ExperienceLevelBody = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 0px 379px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--Neutral-White, #fff);
  box-shadow: 0px 2px 4px 0px rgba(172, 188, 245, 0.25),
    0px 2px 12px 0px rgba(176, 184, 211, 0.3);
`;

function ExperienceLevel() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const ExperienceLevelSampleFile = "/SampleFiles/ExperienceLevelSample.csv";

  const queryClient = useQueryClient();

  const {
    data: experienceLevel = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["experienceLevels"],
    queryFn: () => apiClient.get("experienceLevel"),
  });


  
  const deleteExperienceLevelMutation = useMutation({
    mutationFn: (id) => apiClient.delete('experienceLevel',id),
    onSuccess: () => {
      queryClient.invalidateQueries(['experienceLevels']);
    },
  });

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = () => {
    queryClient.invalidateQueries(['experienceLevels']);
  };

  const handleDeleteSelected = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDeletion = async () => {
    console.log("confirmDeletion clicked");
    console.log("Selected rows for deletion:", selectedRows);
setIsDeleting(true);
    try {
      for (let id of selectedRows) {
        await new Promise((resolve, reject) => {
          deleteExperienceLevelMutation.mutate(id, {
            onSuccess: () => {
              console.log(`Deleted ExperienceLevel with id: ${id}`);
              resolve();
            },
            onError: (error) => {
              console.error(`Error deleting ExperienceLevel with id: ${id}`, error);
              reject(error);
            },
          });
        });
      }
      // Clear selected rows after deletion
      setSelectedRows([]);
      // Close confirmation dialog
      setShowConfirmation(false);
      console.log("All selected ExperienceLevel deleted successfully.");
    } catch (error) {
      console.error("Error deleting ExperienceLevel:", error);
    }
  };

  const cancelDeletion = () => {
    setShowConfirmation(false);
  };

  const getFields = () => [
    { name: "experienceLevelName", label: "ExperienceLevel Name" },
    { name: "description", label: "Description" },
  ];
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = (currentPageRows) => {
    if (selectedRows.length === currentPageRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPageRows);
    }
  };



  //for dialouges
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpload = (data) => {
    console.log('Uploaded data:', data);
    // Handle the uploaded data here
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching Experience Level datas</p>;

  return (
    <ExperienceLevelContainer>
      <ExperienceLevelHeader>
        <BackButton title="Experience Level" />
        <OtherButtons>
          {selectedRows.length > 0 && (
            <DeleteBtn onClick={handleDeleteSelected} number={selectedRows.length}/>
          )}
          <Buttons
            width="257px"
            title="Download .xlsx Sample"
            type="download"
            iconType="download"
            filePath={ExperienceLevelSampleFile}
          />
          <Buttons title="Import .xlsx File" type="upload" iconType="upload" onClick={handleOpenDialog} />
          <Buttons
            width="251px"
            title="Add Experience Level"
            type="create"
            onClick={handleCreateClick}
            iconType="create"
          />
        </OtherButtons>
      </ExperienceLevelHeader>
      <ExperienceLevelBody>
      <ImportFile
        open={dialogOpen}
        onClose={handleCloseDialog}
        onUpload={handleUpload}
        fileType="csv"
        section="experienceLevel"
      />
        <ExperienceLevelPopup
          open={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          title="Create New Experience Level"
          label="Experience Level"
          fields={getFields()}
        />
        {experienceLevel.length === 0 ? (
          <NoData />
        ) : (
          <ExperienceLevelTable data={experienceLevel} selectedRows={selectedRows} 
          onCheckboxChange={handleCheckboxChange}
            onSelectAll={handleSelectAll}
            refetchData={() => queryClient.invalidateQueries(['ExperienceLevels'])} // Pass refetch function
            />
        )}
      </ExperienceLevelBody>
      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message={isDeleting ? "Please Wait your Rows Are Being Deleted...":"Are you sure you want to delete the selected datas?"}
      />
    </ExperienceLevelContainer>
  );
}

export default ExperienceLevel;
