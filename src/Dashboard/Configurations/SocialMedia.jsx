import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../Components/BackButton";
import Buttons from "../Components/Buttons";
import NoData from "../Components/NoData";
import ProfessionPopup from "../Components/PopUps/ProfessionPopup";
import ProfessionTable from "../Components/Table/ProfessionTable/ProfessionTable";
import DeleteBtn from "../../Components/DeleteBtn";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../Api";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import ImportFile from "../Components/ImportFile";
import SocialMediaTable from "../Components/Table/SocialMediaTable/SocialMediaTable";
import SOcialMediaPopup from "../Components/PopUps/SocialMediaPopup";

const SocialMediaContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SocialMediaHeader = styled.div`
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

const SocialMediaBody = styled.div`
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

function SocialMedia() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const SocialMediaSampleFile = "/SampleFiles/SocialMediaSample.csv";

  const queryClient = useQueryClient();

  const {
    data: socialMedia = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["socialMedias"],
    queryFn: () => apiClient.get("socialMedia"),
  });


  
  const deleteProfessionMutation = useMutation({
    mutationFn: (id) => apiClient.delete('socialMedia',id),
    onSuccess: () => {
      queryClient.invalidateQueries(['socialMedias']);
    },
  });

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = () => {
    queryClient.invalidateQueries(['socialMedias']);
  };

  const handleDeleteSelected = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDeletion = async () => {
    console.log("confirm Deletion clicked");
    console.log("Selected rows for deletion:", selectedRows);
setIsDeleting(true);
    try {
      for (let id of selectedRows) {
        await new Promise((resolve, reject) => {
          deleteProfessionMutation.mutate(id, {
            onSuccess: () => {
              console.log(`Deleted social media with id: ${id}`);
              resolve();
            },
            onError: (error) => {
              console.error(`Error deleting social media with id: ${id}`, error);
              reject(error);
            },
          });
        });
      }
      // Clear selected rows after deletion
      setSelectedRows([]);
      // Close confirmation dialog
      setShowConfirmation(false);
      console.log("All selected social media deleted successfully.");
    } catch (error) {
      console.error("Error deleting social medias:", error);
    }
  };

  const cancelDeletion = () => {
    setShowConfirmation(false);
  };

  const getFields = () => [
    { name: "socialMediaName", label: "Social Media Name" },
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
  if (isError) return <p>Error fetching professions</p>;

  return (
    <SocialMediaContainer>
      <SocialMediaHeader>
        <BackButton title="Social Media" />
        <OtherButtons>
          {selectedRows.length > 0 && (
            <DeleteBtn onClick={handleDeleteSelected} number={selectedRows.length}/>
          )}
          <Buttons
            width="257px"
            title="Download .xlsx Sample"
            type="download"
            iconType="download"
            filePath={SocialMediaSampleFile}
          />
          <Buttons title="Import .xlsx File" type="upload" iconType="upload" onClick={handleOpenDialog} />
          <Buttons
            width="241px"
            title="Create Social Media"
            type="create"
            onClick={handleCreateClick}
            iconType="create"
          />
        </OtherButtons>
      </SocialMediaHeader>
      <SocialMediaBody>
      <ImportFile
        open={dialogOpen}
        onClose={handleCloseDialog}
        onUpload={handleUpload}
        fileType="csv"
        section="socialMedia"
      />
        <SOcialMediaPopup
          open={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          title="Add New Social Media"
          label="SocialMedia Name"
          fields={getFields()}
        />
        {socialMedia.length === 0 ? (
          <NoData />
        ) : (
          <SocialMediaTable data={socialMedia} selectedRows={selectedRows} 
          onCheckboxChange={handleCheckboxChange}
            onSelectAll={handleSelectAll}
            refetchData={() => queryClient.invalidateQueries(['socialMedias'])} // Pass refetch function
            />
        )}
      </SocialMediaBody>
      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message={isDeleting ? "Please Wait your Rows Are Being Deleted...":"Are you sure you want to delete the selected categories?"}
      />
    </SocialMediaContainer>
  );
}

export default SocialMedia;
