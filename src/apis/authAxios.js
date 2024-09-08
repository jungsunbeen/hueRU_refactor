import axios from "axios";
import { getNewRefreshToken } from "./testapis";

export const getAuthAxios = (token) => {
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    authAxios.interceptors.response.use(
        (response) => response, // On success, return the response
        async (error) => { // On error, handle token refresh
            const result = await getNewRefreshToken();
            error.config.headers.Authorization = `Bearer ${result.accessToken}`;
            localStorage.setItem("access", result.accessToken);
            localStorage.setItem("refresh", result.refreshToken);
            return await axios.get(error.config.url, error.config);
        }
    );
    return authAxios;
};