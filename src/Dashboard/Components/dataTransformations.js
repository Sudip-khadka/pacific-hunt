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
    isActiveCategory:stringToBoolean(row['Is Active']),
    // Additional fields or adjustments if needed
  }),
  profession: (row) => ({
    id: uuidv4(),  // Generate a unique ID
    profession: row['Profession Name'],  // Map to API's expected field names
    createdAt: new Date(row['Created On']).toISOString(),  // Convert to ISO string format
    isActiveProfession: stringToBoolean(row['Is Active']),  // Convert to boolean
    // Additional fields or adjustments if needed
  }),
  companyType: (row) =>({
    id:uuidv4(),
    companyType: row['Company Type'],
    createdAt: new Date(row['Created On']).toISOString(),
    isActiveCompany:stringToBoolean(row['Is Active']),
  })
  // Add more categories if needed
};

export default transformations;
