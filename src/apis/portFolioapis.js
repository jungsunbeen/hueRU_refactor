import axios from "axios";

const baseURL = 'https://maknaengee.p-e.kr';

//put FormData
export const putFormData = async (formData) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${baseURL}/portfolio/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }});
   return response.data;
  };


// AboutMe
export const postThisIsMe = async (content) => {
  try { 
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${baseURL}/portfolio/this-is-me/`, content, {
      headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const delThisIsMe = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${baseURL}/portfolio/this-is-me/${id}/`, {
       headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Bingo
export const postBingo = async (content) => {
  try { 
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${baseURL}/portfolio/bingo-complete/`, content, {
      headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const delBingo = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${baseURL}/portfolio/bingo-complete/${id}/`, {
       headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Others
export const postOthers = async (content) => {
  try { 
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${baseURL}/portfolio/other-complete/`, content, {
      headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const delOthers = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${baseURL}/portfolio/other-complete/${id}/`, {
       headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//전체 데이터 get
export const getData = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseURL}/portfolio/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//후기글 전체 get
export const getReview = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${baseURL}/portfolio/review/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

//후기글 빙고 인증 후기 get
export const getCertifiedReview = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${baseURL}/portfolio/review/?only=bingo`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};