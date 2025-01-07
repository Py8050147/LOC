'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { DataTable } from '../_components/data-table';
import { columns } from './_components/columns';
import { useQuery } from '@tanstack/react-query';
import { getAllCourses } from '@/http/api';
import { Courses } from '../../../../types';
import Coursessheet from './_components/course-sheet';
import { useNewCourses } from '@/store/courses/course-store';
import { Loader2 } from 'lucide-react';

const CoursesPage = () => {
    const { onOpen } = useNewCourses();

    const {
        data: courses,
        isLoading,
        isError,
    } = useQuery<Courses[]>({
        queryKey: ['courses'],
        queryFn: getAllCourses,
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Products</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Product
                </Button>
                <Coursessheet />
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={courses || []} />
            )}
        </>
    );
};

export default CoursesPage;
