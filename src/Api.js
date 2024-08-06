export const apiConfig = {
  category: import.meta.env.VITE_API_CATEGORY,
  profession: import.meta.env.VITE_API_PROFESSION,
  companyType: import.meta.env.VITE_API_COMPANY_TYPE,
  socialMedia: import.meta.env.VITE_API_SOCIAL_MEDIA,
  jobType: import.meta.env.VITE_API_JOB_TYPE,
  skills: import.meta.env.VITE_API_SKILLS,
  workLocation: import.meta.env.VITE_API_WORK_LOCATION,
  educationLevel: import.meta.env.VITE_API_EDUCATION_LEVEL,
  experienceLevel: import.meta.env.VITE_API_EXPERIENCE_LEVEL,
};

  
  const apiClient = {
    getAll: async (resource) => {
      if (!apiConfig[resource]) {
        throw new Error(`Unknown resource: ${resource}`);
      }
      const response = await fetch(apiConfig[resource]);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}s`);
      }
      return response.json();
    },
  
    getOne: async (resource, id) => {
      if (!apiConfig[resource]) {
        throw new Error(`Unknown resource: ${resource}`);
      }
      const response = await fetch(`${apiConfig[resource]}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource} with id ${id}`);
      }
      return response.json();
    },

    get: async (resource) => {
        if (!apiConfig[resource]) {
          throw new Error(`Unknown resource: ${resource}`);
        }
        const url = apiConfig[resource];
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${resource}`);
        }
        return response.json();
      },
    post: async (resource, data) => {
      if (!apiConfig[resource]) {
        throw new Error(`Unknown resource: ${resource}`);
      }
      const response = await fetch(apiConfig[resource], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to create ${resource}`);
      }
      return response.json();
    },
  
    update: async (resource, id, data) => {
      if (!apiConfig[resource]) {
        throw new Error(`Unknown resource: ${resource}`);
      }
      const response = await fetch(`${apiConfig[resource]}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${resource} with id ${id}`);
      }
      return response.json();
    },
  
    delete: async (resource, id) => {
      if (!apiConfig[resource]) {
        throw new Error(`Unknown resource: ${resource}`);
      }
      const response = await fetch(`${apiConfig[resource]}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ${resource} with id ${id}`);
      }
      return response.json();
    },
  };
  
  export default apiClient;