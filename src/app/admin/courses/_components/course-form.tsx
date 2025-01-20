import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { courseSchema } from '@/validators/coursesSchema';

import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
// import { LoaderCircle } from 'lucide-react'

export type FormValues = z.input<typeof courseSchema>;

const CreateCoursesForm = ({
    onSubmit,
    disabled,
}: {
    onSubmit: (formValues: FormValues) => void;
    disabled: boolean;
}) => {
    const form = useForm<z.infer<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const fileRef = form.register('image');
    const fileRefe = form.register('videoFile');

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
        // console.log('hello')
    };




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Course Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea data-gramm="false" placeholder="Brief course description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input type="file" {...fileRef} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="videoFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                                <Input type="file" {...fileRefe} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full " disabled={disabled}>
                    {disabled ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create'}
                </Button>

            </form>

        </Form>
    );
};

export default CreateCoursesForm;


