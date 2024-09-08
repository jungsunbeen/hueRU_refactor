import axios from "axios";

const baseURL = 'https://maknaengee.p-e.kr';

export const myInfo = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseURL}/my/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    alert('로그인이 필요합니다.')
    console.log(error)
    throw error;
  }
}