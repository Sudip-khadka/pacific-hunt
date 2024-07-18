// api.ts

import axios from 'axios';

const BASE_URL = 'https://retoolapi.dev/szKpMq';
const categoryApi = 'https://retoolapi.dev/MyI6oO/category';

// Define your endpoints
const endpoints = {
  categories: `${BASE_URL}/categories`,
  companies: `${BASE_URL}/companies`,
  skills: `${BASE_URL}/skills`,
  professions: `${BASE_URL}/professions`,
  // Add more endpoints as needed
};

// API functions
export const getCategories = async () => {
  return axios.get(endpoints.categories);
};

export const createCategory = async (data) => {
  return axios.post(endpoints.categories, data);
};

export const updateCategory = async (id, data) => {
  return axios.put(`${endpoints.categories}/${id}`, data);
};

export const deleteCategory = async (id) => {
  return axios.delete(`${endpoints.categories}/${id}`);
};

// Similarly, create functions for other endpoints
