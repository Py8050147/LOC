// import { Courses } from "../../types";
import { Comment } from "../../types";

import { api } from "./client";

export const getAllCourses = async () => {
    const response = await api.get('/courses');
    console.log(response.data)
    return  response.data;
}; 

export const createCourses = async (data: FormData) => {
  const response = await api.post('/courses', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
  console.log(response)
  return response.data;
}
  

export const getSingleCourses = async (id: string) => {
  try {
    console.log(`Fetching course with ID: ${id}`);
    const response = await api.get(`/courses/${id}`);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch course with ID ${id}:`, error);
    throw error; // Ensure the error propagates to React Query
  }
};



export const Createcomments = async (data: Comment) => {
    const response = await api.post("/comments", data);
    console.log("Comment posted successfully:", response.data); // Debugging log
    return response.data;
};

export const getAllComments = async (id: string) => {
  const response = await api.get(`/comments?courseId=${id}`);
    console.log("All comments:", response.data); // Debugging log
    return response.data;
};
