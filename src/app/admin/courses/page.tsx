'use client'
import { Button } from "@/components/ui/button"
import { DataTable } from "../_components/data-table"
import { getAllCourses } from "@/http/api"
import { Course } from "../../../../types"
import { Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import {columns} from "./_components/columns"
import CoursesSheet from "./_components/course-sheet"
import { useNewCourses } from "@/store/courses/course-store"

const coursesPage = () => {
  const { onOpen } = useNewCourses();

  const {
      data: courses,
      isLoading,
      isError,
  } = useQuery<Course[]>({
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
          <CoursesSheet />
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
  )

}

export default coursesPage