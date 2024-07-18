import React, { useState } from 'react';
import Button from './Button';
import CreatePopup from './CreatePopup';

const EntityManager = ({ entityType }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (formData) => {
    console.log(`Creating new ${entityType}:`, formData);
    // Here you would typically send the data to your backend
    setIsPopupOpen(false);
  };

  const getFields = () => {
    switch (entityType) {
      case 'skill':
        return [
          { name: 'name', label: 'Skill Name' },
          { name: 'category', label: 'Category' }
        ];
      case 'category':
        return [
          { name: 'name', label: 'Category Name' },
          { name: 'description', label: 'Description' }
        ];
      case 'profession':
        return [
          { name: 'title', label: 'Profession Title' },
          { name: 'field', label: 'Field' }
        ];
      case 'company':
        return [
          { name: 'name', label: 'Company Name' },
          { name: 'industry', label: 'Industry' }
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      <h2>{entityType.charAt(0).toUpperCase() + entityType.slice(1)} Management</h2>
      <Button type="create" title={`Create ${entityType}`} onClick={handleCreateClick} />
      <CreatePopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
        title={`Create New ${entityType}`}
        fields={getFields()}
      />
    </div>
  );
};

export default EntityManager;