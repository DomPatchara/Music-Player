// ---- For Handles Token --------//



const CLIENT_SECRET = "a1c21a4fb42a4644b30f0dcfdc71fc68"
const CLIENT_ID = "5a709febc2eb400d831520a5d71e867c"

// ดึง Token & RefreshToken จาก localStorage ใน Application เรา
export const getStoredToken = () => localStorage.getItem("token");
export const getStoreRefreshToken = () => localStorage.getItem("refresh_token");


// เก็บ Token ใหม่
export const storeTokens = (accessToken, refreshToken) => {
    window.localStorage.setItem("token", accessToken);
    if (refreshToken) window.localStorage.setItem("refresh_token", refreshToken);
};


// Clear Token
export const clearTokens = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refresh_token");
};

// function refresh token ใหม่ from spotify-web dev 
export const refreshAccessToken = async () => {

    // refresh token that has been previously stored
    const refreshToken = getStoreRefreshToken();
    const url = "https://accounts.spotify.com/api/token";
    const encodedCredentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
 
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': `Basic ${encodedCredentials}`
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: CLIENT_ID
       }),
     }
     const body = await fetch(url, payload);
     const response = await body.json();

     console.log("Respontype",response)
 
     localStorage.setItem('access_token', response.accessToken);
     if (response.refreshToken) {
       localStorage.setItem('refresh_token', response.refreshToken);
     }
   }