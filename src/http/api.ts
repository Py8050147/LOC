// import { Courses } from "../../types";

import { api } from "./client";

export const getAllCourses = async () => {
    const response = await api.get('/courses');
    // console.log(response.data)
    return  response.data;
}; 

export const createCourses = async (data: FormData) => {
    try {
      const response = await api.post('/courses', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Ensures cookies or tokens are sent with the request
      });
  
      console.log("Response Data:", response.data);
  
      return response.data;
    } catch (error: any) {
      // Improved error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", error.response.data);
        throw new Error(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        // Request was sent, but no response was received
        console.error("Network Error: No response received.");
        throw new Error("Network error. Please try again later.");
      } else {
        // Something else went wrong in setting up the request
        console.error("Error:", error.message);
        throw new Error(error.message || "An unknown error occurred.");
      }
    }
  };
  

export const getSingleCourses = async (id: string) => {
    console.log(`Fetching course with ID: ${id}`);
    const response = await api.get(`/courses/${id}`);
    console.log('API response:', response.data);
    return response.data;
};
