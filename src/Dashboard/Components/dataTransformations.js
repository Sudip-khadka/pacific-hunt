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
  }),
socialMedia: (row)=>({
  id:uuidv4(),
  socialMediaName:row['Social Media Name'],
  socialMediaUrls: row['Social Media Url'],
  socialMediaImage:row['Icon Url'],
  createdAt: new Date(row['Created On']).toISOString(),
  isActiveMedia:stringToBoolean(row['Is Active']),
}),
jobType: (row)=>({
  id:uuidv4(),
  jobType: row['Job Type'],
  createdAt: new Date(row['Created On']).toISOString(),
  isActive:stringToBoolean(row['Is Active']),
}),
skills: (row)=>({
  id:uuidv4(),
  skillsName: row['Skill Name'],
  createdAt: new Date(row['Created On']).toISOString(),
  isActive:stringToBoolean(row['Is Active']),
}),
workLocation: (row)=>({
  id:uuidv4(),
  locationType: row['Work Location'],
  createdAt: new Date(row['Created On']).toISOString(),
  isActive:stringToBoolean(row['Is Active']),
}),
educationLevel: (row)=>({
  id:uuidv4(),
  educationLevel: row['Education Level'],
  createdAt: new Date(row['Created On']).toISOString(),
  isActive:stringToBoolean(row['Is Active']),
}),
// educationLevel: ['Education Level','Created On', 'Is Active'],
// experienceLevel: ['Experience Level','Created On', 'Is Active'],
experienceLevel: (row)=>({
  id:uuidv4(),
  experienceLevel: row['Experience Level'],
  createdAt: new Date(row['Created On']).toISOString(),
  isActive:stringToBoolean(row['Is Active']),
}),
  // Add more categories if needed
};

export default transformations;
