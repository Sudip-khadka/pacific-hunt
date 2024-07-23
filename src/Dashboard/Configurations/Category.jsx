import React, { useState } from 'react';
import styled from 'styled-components';
import BackButton from '../Components/BackButton';
import Buttons from '../Components/Buttons';
import NoData from '../Components/NoData';
import Table from '../Components/Table/Table';
import CategoryPopup from '../Components/PopUps/CategoryPopup';
import DeleteBtn from '../../Components/DeleteBtn';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../Api';
import ConfirmationDialog from '../../Components/ConfirmationDialog';

const CategoryContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CategoryHeader = styled.div`
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

const CategoryBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--Neutral-White, #FFF);
  box-shadow: 0px 2px 4px 0px rgba(172, 188, 245, 0.25), 0px 2px 12px 0px rgba(176, 184, 211, 0.30);
`;

function Category() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.get('category'),
  });
  
  const createCategoryMutation = useMutation({
    mutationFn: (newCategory) => apiClient.post('category', newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
  
  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => apiClient.delete('category',id),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (formData, e) => {
    e.preventDefault();
    createCategoryMutation.mutate(formData, {
      onSuccess: () => {
        setIsPopupOpen(false);
      },
      onError: (error) => {
        console.error("Error creating category:", error);
      }
    });
  };

  const handleDeleteSelected = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDeletion = async () => {
    console.log("confirmDeletion clicked");
    console.log("Selected rows for deletion:", selectedRows);

    try {
      for (let id of selectedRows) {
        await new Promise((resolve, reject) => {
          deleteCategoryMutation.mutate(id, {
            onSuccess: () => {
              console.log(`Deleted category with id: ${id}`);
              resolve();
            },
            onError: (error) => {
              console.error(`Error deleting category with id: ${id}`, error);
              reject(error);
            },
          });
        });
      }
      // Clear selected rows after deletion
      setSelectedRows([]);
      // Close confirmation dialog
      setShowConfirmation(false);
      console.log("All selected categories deleted successfully.");
    } catch (error) {
      console.error("Error deleting categories:", error);
    }
  };

  const cancelDeletion = () => {
    setShowConfirmation(false);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedRows(isChecked ? categories.map((item) => item.id) : []);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching categories</p>;

  return (
    <CategoryContainer>
      <CategoryHeader>
        <BackButton title="Categories" />
        <OtherButtons>
          {selectedRows.length > 0 && (
            <DeleteBtn onClick={handleDeleteSelected} />
          )}
          <Buttons width="257px" title="Download .xlsx Sample" type="download" iconType="download" />
          <Buttons title="Import .xlsx File" type="upload" iconType="upload" />
          <Buttons width="221px" title="Create Categories" type="create" onClick={handleCreateClick} iconType="create" />
        </OtherButtons>
      </CategoryHeader>
      <CategoryBody>
        <CategoryPopup
          open={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          title="Create New Category"
          fields={[
            { name: 'categoryName', label: 'Category Name' },
            { name: 'description', label: 'Description' },
          ]}
        />
        {categories.length === 0 ? <NoData /> : (
          <Table
            data={categories}
            selectedRows={selectedRows}
            onCheckboxChange={handleCheckboxChange}
            onSelectAll={handleSelectAll}
          />
        )}
      </CategoryBody>

      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        title="Confirm Deletion"
        message="Are you sure you want to delete the selected categories?"
      />
    </CategoryContainer>
  );
}

export default Category;
