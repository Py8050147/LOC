// import { Courses } from "../../types";

import { api } from "./client";

export const getAllCourses = async () => {
    const response = await api.get('/courses');
    return await response.data;
}; 

export const createCourses = async (data: FormData) => {
    const response = await api.post('/courses', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });

    console.log(response.data)
    // http://localhost:3000/api/courses

    return response.data;
};

export const getSingleCourses = async (id: string) => {
    console.log(`Fetching course with ID: ${id}`);
    const response = await api.get(`/courses/${id}`);
    console.log('API response:', response.data);
    return response.data;
};
