import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../Components/BackButton";
import Buttons from "../Components/Buttons";
import NoData from "../Components/NoData";
import JobTypePopup from "../Components/PopUps/JobTypePopup";
import JobTypeTable from "../Components/Table/JobTypeTable/JobTypeTable";
import DeleteBtn from "../../Components/DeleteBtn";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../Api";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import ImportFile from "../Components/ImportFile";

const JobTypeContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const JobTypeHeader = styled.div`
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
  @media(max-width:768px){
  flex-direction:column;
  gap:10px;
  align-items:start;}
`;

const OtherButtons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap:wrap;
`;

const JobTypeBody = styled.div`
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

function JobType() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const JobTypeSampleFile = "/SampleFiles/JobTypeSample.csv";

  const queryClient = useQueryClient();

  const {
    data: jobTypes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobTypes"],
    queryFn: () => apiClient.get("jobType"),
  });


  
  const deleteJobTypeMutation = useMutation({
    mutationFn: (id) => apiClient.delete('jobType',id),
    onSuccess: () => {
      queryClient.invalidateQueries(['jobTypes']);
    },
  });

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (formData) => {
    queryClient.invalidateQueries(['jobTypes']);
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
          deleteJobTypeMutation.mutate(id, {
            onSuccess: () => {
              console.log(`Deleted jobType with id: ${id}`);
              resolve();
            },
            onError: (error) => {
              console.error(`Error deleting jobType with id: ${id}`, error);
              reject(error);
            },
          });
        });
      }
      // Clear selected rows after deletion
      setSelectedRows([]);
      // Close confirmation dialog
      setShowConfirmation(false);
      console.log("All selected jobType deleted successfully.");
    } catch (error) {
      console.error("Error deleting jobType:", error);
    }
  };

  const cancelDeletion = () => {
    setShowConfirmation(false);
  };

  const getFields = () => [
    { name: "JobTypeName", label: "JobType Name" },
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
  if (isError) return <p>Error fetching jobTypes</p>;

  return (
    <JobTypeContainer>
      <JobTypeHeader>
        <BackButton title="Job Types" />
        <OtherButtons>
          {selectedRows.length > 0 && (
            <DeleteBtn onClick={handleDeleteSelected} number={selectedRows.length}/>
          )}
          <Buttons
            width="257px"
            title="Download .xlsx Sample"
            type="download"
            iconType="download"
            filePath={JobTypeSampleFile}
          />
          <Buttons title="Import .xlsx File" type="upload" iconType="upload" onClick={handleOpenDialog} />
          <Buttons
            width="221px"
            title="Create JobType"
            type="create"
            onClick={handleCreateClick}
            iconType="create"
          />
        </OtherButtons>
      </JobTypeHeader>
      <JobTypeBody>
      <ImportFile
        open={dialogOpen}
        onClose={handleCloseDialog}
        onUpload={handleUpload}
        fileType="csv"
        section="jobType"
      />
        <JobTypePopup
          open={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          title="Create New JobType"
          label="JobType Name"
          fields={getFields()}
        />
        {jobTypes.length === 0 ? (
          <NoData />
        ) : (
          <JobTypeTable data={jobTypes} selectedRows={selectedRows} 
          onCheckboxChange={handleCheckboxChange}
            onSelectAll={handleSelectAll}
            refetchData={() => queryClient.invalidateQueries(['jobTypes'])} // Pass refetch function
            />
        )}
      </JobTypeBody>
      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message={isDeleting ? "Please Wait your Rows Are Being Deleted...":"Are you sure you want to delete the selected categories?"}
      />
    </JobTypeContainer>
  );
}

export default JobType;
