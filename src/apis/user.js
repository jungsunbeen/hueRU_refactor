import axios from "axios";

const baseURL = 'https://maknaengee.p-e.kr';

export const signUp = async (password, username, hash, first_name, college) => {
  const response = await axios.post(`${baseURL}/users/join/`, {
    password, 
    username, 
    hash, 
    first_name,
    college,
  });
  return response;
};

export const login = async (username, password) => {
  const response = await axios.post(`${baseURL}/users/login/`, {
    username,
    password,
  })
  // console.log(response.data);
  return response.data;
};

export const isUsernameDuplicate = async (username) => {
  try {
    const response = await axios.get(`${baseURL}/users/join/`, {
      params : { username : username }
    });
    return response.data.available;
  } catch (error) {
    console.error('username 필드 필요', error);
    throw error;
  }
};


export const SendAuthCodeToEmail = async (answer) => {
  try {
    const response = await axios.post(`${baseURL}/users/verify/`, answer );
    return response.data;
  } catch(error) {
      console.error(error);
      throw error;
  }
}

export const postAuthCode = async (answer) => {
  try {
    const response = await axios.post(`${baseURL}/users/verify/`,  answer );
    return response.data;
  } catch(error) {
      console.error(error);
      throw error;
  }
}

// export const isReferrerExist = async (referrer) => {
//   try {
//     const response = await axios.get(`${baseURL}/users/join/`, {
//       params: { referrer }
//     });
//     return response.data.available;
//   } catch (error) {
//     console.error('username 필드 필요', error);
//     throw error;
//   }
// };