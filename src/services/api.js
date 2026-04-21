import axios from 'axios';

const BASE_URL = 'https://api-placeholder.com'; // Replace with actual API

export const getToken = async (studentId, password) => {
  const response = await axios.post(`${BASE_URL}/public/token`, { studentId, password });
  return response.data.token;
};

export const fetchData = async (token) => {
  const response = await axios.get(`${BASE_URL}/private/data`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};