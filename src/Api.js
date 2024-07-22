const apiConfig = {
  category: "https://retoolapi.dev/fLNOtX",
  profession: "https://retoolapi.dev/ewEY3Q",
};

const getApiUrl = (resource) => {
  const baseUrl = apiConfig[resource];
  if (!baseUrl) {
      throw new Error(`Resource type ${resource} is not supported`);
  }
  return baseUrl;
};

const apiClient = {
  get: async (resource, endpoint) => {
      const url = `${getApiUrl(resource)}/${endpoint}`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
      }
      return await response.json();
  },
  post: async (resource, endpoint, data) => {
      const url = `${getApiUrl(resource)}/${endpoint}`;
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      if (!response.ok) {
          throw new Error(`Failed to post data to ${url}`);
      }
      return await response.json();
  },
  // Add other HTTP methods (PUT, DELETE, etc.) if needed
};

export default apiClient;
