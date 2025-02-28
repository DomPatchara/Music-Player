// For Authorization Code Flow ----> ต้องมีหน้า login page for Authorize ------> เพื่อรับ AccessToken

import axios from "axios";
import { getStoredToken, refreshAccessToken, storeTokens } from "./auth";


const redirectUri = "http://localhost:4000"

const authEndpoint = "https://accounts.spotify.com/authorize?"
const scope = ["user-library-read", "playlist-read-private"];

const CLIENT_ID = "5a709febc2eb400d831520a5d71e867c"

export const loginEndpoint = `${authEndpoint}client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope.join("%20")}&response_type=token&show_dialog=true`

//---------------------------------------------------------------------------------------------------------------------------------------------// 

const apiClient = axios.create({ baseURL: "https://api.spotify.com/v1/"});


// Function to update token 
export const setClientToken = (token) => {
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

apiClient.interceptors.request.use(async (config) => {
  let token = getStoredToken();
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Auto-refresh token when it expire (401 error)
apiClient.interceptors.response.use(res => res, async(error) => {
  if (error.response?.status === 401) {
    console.log("Received 401 error:", error);
    const newToken = await refreshAccessToken();
    console.log("New token:", newToken);
    if (newToken) {
      storeTokens(newToken);
      setClientToken(newToken);
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(error.config); // retry failed request
    }
  }
  return Promise.reject(error);
})

export default apiClient



//  for Credentail Flow ไม่ต้องสร้างหน้า Login //

// const CLIENT_ID = "5a709febc2eb400d831520a5d71e867c";
// const CLIENT_SECRET = "a1c21a4fb42a4644b30f0dcfdc71fc68";

// const getAccessToken = async () => {
//     const authParams = new URLSearchParams();
//     authParams.append("grant_type", "client_credentails");

//     try {
//         const res = axios.post('https://accounts.spotify.com/api/token', authParams,{
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
//             }
//         });

//         return res.data.access_token;
//     } catch (error){
//         console.error("Error fetch access Token:", error);
//     }

// }

