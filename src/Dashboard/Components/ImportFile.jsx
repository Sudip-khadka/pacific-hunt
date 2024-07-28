import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { FaFileCsv } from 'react-icons/fa';
import { MdCloudUpload } from 'react-icons/md';
import Papa from 'papaparse';
import transformations from './dataTransformations'; // Adjust the path as needed
import { useQueryClient } from '@tanstack/react-query';
import apiClient from '../../Api';
import Alert from './Alert';

// Styled Components
const DragAndDropArea = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed ${(props) => props.theme.borderColor || '#01A3E0'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor || '#DEF3FF'};
  cursor: pointer;
  margin-bottom: 16px;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor || '#DEEAFF'};
  }

  svg {
    font-size: 48px;
    color: ${(props) => props.theme.iconColor || '#666'};
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.textColor || '#333'};
  margin: 16px 0;
`;

const FileInput = styled.input`
  display: none;
`;

function ImportFile({ open, onClose, fileType = 'csv', section }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });

  const getFileIconAndMessage = () => {
    switch (fileType) {
      case 'csv':
        return {
          icon: <FaFileCsv />,
          message: 'Drag & Drop your CSV file here or click to select',
        };
      case 'upload':
        return {
          icon: <MdCloudUpload />,
          message: 'Drag & Drop your file here or click to select',
        };
      default:
        return {
          icon: <MdCloudUpload />,
          message: 'Drag & Drop your file here or click to select',
        };
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (file) => {
    if (file && fileType === 'csv' && file.type === 'text/csv') {
      setFile(file);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log('Parsed Results:', results.data);
          if (validateHeaders(results.meta.fields)) {
            const transformedData = results.data.map(transformations[section]);
            setData(transformedData);
            postDataToAPI(transformedData);
          } else {
            setShowAlert({ show: true, message: 'CSV file does not have the required headers.', type: 'error' });
          }
        },
      });
    } else {
      setShowAlert({ show: true, message: 'Please upload a valid CSV file.', type: 'error' });
    }
  };

  const validateHeaders = (headers) => {
    const headerMapping = {
      category: ['Category Name', 'Created On', 'Is Popular', 'Is Active'],
      profession: ['Profession Name', 'Created On', 'Is Active'],
      companyType: ['Company Type', 'Created On', 'Is Active'],
      socialMedia: ['Social Media Name','Created On','Is Active','Social Media Url','Icon Url'],
      jobType: ['Job Type', 'Created On', 'Is Active'],
      skills: ['Skill Name', 'Created On', 'Is Active'],
      workLocation: ['Work Location','Created On', 'Is Active'],
      educationLevel: ['Education Level','Created On', 'Is Active'],
      experienceLevel: ['Experience Level','Created On', 'Is Active'],
    };
    const requiredHeaders = headerMapping[section];
    return requiredHeaders.every(header => headers.includes(header));
  };

  const queryClient = useQueryClient();
  const postDataToAPI = async (data) => {
    setUploading(true);
    try {
      for (const item of data) {
        const itemWithId = {
          ...item,
        };
        try {
          const result = await apiClient.post(section, itemWithId);
          console.log('Data successfully uploaded:', result);
        } catch (innerError) {
          console.error('Error uploading item:', itemWithId, innerError);
          setShowAlert({ show: true, message: `Failed to upload item: ${JSON.stringify(itemWithId)}`, type: 'error' });
        }
      }
      queryClient.invalidateQueries([section]);
      setShowAlert({ show: true, message: 'Successfully uploaded all data.', type: 'success' });
      setUploading(false);
      setFile(null);
      setData([]);
    } catch (error) {
      console.error('Error uploading data:', error);
      setShowAlert({ show: true, message: 'Failed to upload data.', type: 'error' });
      setUploading(false);
    }
  };

  useEffect(() => {
    if (showAlert.show && showAlert.type === 'success') {
      const timer = setTimeout(() => {
        setShowAlert({ show: false, message: '', type: '' });
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, onClose]);

  const { icon, message } = getFileIconAndMessage();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', color: '#01A3E0' }}>
        {`Import ${section} datas`}
      </DialogTitle>
      <DialogContent>
        <DragAndDropArea
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ opacity: uploading ? 0.5 : 1 }}
        >
          {icon}
          <Message>{message}</Message>
          <FileInput
            type="file"
            accept={fileType === 'csv' ? '.csv' : '*/*'}
            onChange={handleChange}
            id="fileInput"
            disabled={uploading}
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer', color: '#01A3E0' }}>
            Choose File
          </label>
        </DragAndDropArea>
        {uploading && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <CircularProgress />
          </div>
        )}
        {showAlert.show && <Alert message={showAlert.message} type={showAlert.type} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={uploading}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportFile;
