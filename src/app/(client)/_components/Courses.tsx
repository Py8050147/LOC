'use client';
import React from 'react';
import { getAllCourses } from '@/http/api';
import { Course } from '../../../../types';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

// Import and configure the font
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

const Courses = () => {
    const { data: courses, isLoading, isError, error } = useQuery({
        queryKey: ['courses'],
        queryFn: getAllCourses,
    });

    if (isLoading) {
        return (
            <div className={`${poppins.className} text-center py-8 text-gray-500`}>
                Loading courses...
            </div>
        );
    }

    if (isError) {
        return (
            <div className={`${poppins.className} text-center py-8 text-red-600`}>
                Error loading courses: {String(error)}
            </div>
        );
    }

    return (
        <div className={`${poppins.className}`}>
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Courses</h1>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses?.map((course: Course) => (
                        <div
                            key={course.id}
                            className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={400}
                                height={300}
                                sizes="100%"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                className="rounded-t-lg"
                            />

                            <div className="p-4 flex flex-col flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {course.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                                <div className="mt-auto">
                                    <Link href={`/courses/${course.id}`}>
                                        <Button
                                            size={'sm'}
                                            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
