import { v4 as uuidv4 } from 'uuid';
// Helper function to convert string to boolean
const stringToBoolean = (value) => {
  return value.toLowerCase() === 'yes';
};

// Transformation rules for each category
const transformations = {
  category: (row) => ({
    id: uuidv4(),  // Generate a unique ID
    category: row['Category Name'],  // Map to API's expected field names
    createdAt: new Date(row['Created On']).toISOString(),  // Convert to ISO string format
    isPopularCategory: stringToBoolean(row['Is Popular']),  // Convert to boolean
    // Additional fields or adjustments if needed
  }),
  profession: (row) => ({
    id: uuidv4(),  // Generate a unique ID
    profession: row['Profession Name'],  // Map to API's expected field names
    startDate: new Date(row['Start Date']).toISOString(),  // Convert to ISO string format
    isInDemand: stringToBoolean(row['Is In Demand']),  // Convert to boolean
    isActive: stringToBoolean(row['Is Active']),  // Convert to boolean
    // Additional fields or adjustments if needed
  }),
  // Add more categories if needed
};

export default transformations;
