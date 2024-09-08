import axios from "axios";

const baseURL = 'https://maknaengee.p-e.kr';

export const getTypeTestResult = async(type) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseURL}/typetest/result/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
      console.error('Error in getInfo:', error.response ? error.response.data : error.message);
      throw error;
  }
};