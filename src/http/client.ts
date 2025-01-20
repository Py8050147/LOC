import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// api.interceptors.response.use(
//     (response) => response, // Pass through successful responses
//     (error) => {
//         console.error("API Error:", error.response || error.message);
//         return Promise.reject(error); // Forward the error
//     }
// );
