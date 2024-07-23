import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaFileCsv } from 'react-icons/fa';
import { MdCloudUpload } from 'react-icons/md';
import Papa from 'papaparse';
import transformations from './dataTransformations'; // Adjust the path as needed
import { v4 as uuidv4 } from 'uuid';
import apiClient from '../../Api';

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

// ImportFileDialog Component
function ImportFile({ open, onClose, fileType = 'csv', section }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

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
            alert('CSV file does not have the required headers.');
          }
        },
      });
    } else {
      alert('Please upload a valid CSV file.');
    }
  };
  

  const validateHeaders = (headers) => {
    const headerMapping = {
      category: ['Category Name', 'Created On', 'Is Popular', 'Is Active'],
      profession: ['Profession Name', 'Start Date', 'Is In Demand', 'Is Active'],
      // Add more sections if needed
    };

    const requiredHeaders = headerMapping[section];
    return requiredHeaders.every(header => headers.includes(header));
  };

  const postDataToAPI = async (data) => {
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
          alert(`Failed to upload item: ${JSON.stringify(itemWithId)}`);
        }
      }
      alert('All data successfully uploaded');
      if (onClose) onClose();
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Failed to upload data');
    }
  };
  

  const { icon, message } = getFileIconAndMessage();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', color: '#01A3E0' }}>
        {`Import ${section} Data`}
      </DialogTitle>
      <DialogContent>
        <DragAndDropArea
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {icon}
          <Message>{message}</Message>
          <FileInput
            type="file"
            accept={fileType === 'csv' ? '.csv' : '*/*'}
            onChange={handleChange}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer', color: '#01A3E0' }}>
            Choose File
          </label>
        </DragAndDropArea>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportFile;
