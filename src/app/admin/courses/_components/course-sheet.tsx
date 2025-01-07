import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CreateCoursesForm, {FormValues} from './course-form'

import {useMutation, useQueryClient} from '@tanstack/react-query'
import { createCourses } from '@/http/api'
import { useNewCourses } from '@/store/courses/course-store'
// import { useNewProduct } from "@/store/product/product-store";
// import { useToast } from '@/hooks/use-toast'


const CoursesSheet = () => {
//   const { toast } = useToast();

  const { isOpen, onClose } = useNewCourses();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-courses'],
        mutationFn: (data: FormData) => createCourses(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            // toast({
            //     title: 'Product created successfully',
            // });
            onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log('values', values);
        const formdata = new FormData();
        console.log(formdata)
        formdata.append('title', values.title);
        formdata.append('description', values.description);
        formdata.append('image', (values.image as FileList)[0]);
        formdata.append('videoFile', (values.videoFile as FileList)[0]);

        mutate(formdata);
    };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Course</SheetTitle>
                    <SheetDescription>Create a new Course</SheetDescription>
                </SheetHeader>
                <CreateCoursesForm onSubmit={onSubmit} disabled={isPending} />
            </SheetContent>
        </Sheet>
  )
}

export default CoursesSheet

