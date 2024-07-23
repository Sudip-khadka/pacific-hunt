const apiConfig = {
    category: "https://retoolapi.dev/Pgomdn/category",
    profession: "https://retoolapi.dev/ewEY3Q/profession",
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