// For Authorization Code Flow ----> ต้องมีหน้า login page for Authorize ------> เพื่อรับ AccessToken

import axios from "axios";

const redirectUri = "http://localhost:4000"

const authEndpoint = "https://accounts.spotify.com/authorize?"
const scope = ["user-library-read", "playlist-read-private"];

const client_id = "5a709febc2eb400d831520a5d71e867c"

export const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scope.join("%20")}&response_type=token&show_dialog=true`

//---------------------------------------------------------------------------------------------------------------------------------------------// 

const apiClient = axios.create({ baseURL: "https://api.spotify.com/v1/"});


// Function to update token 
export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient



