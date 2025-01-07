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
        console.log('hello')
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
                                <Textarea placeholder="Brief course description" {...field} />
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
                    name="description"
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
                    
                <Button className="w-full" disabled={disabled}>
                    {disabled ? <Loader2 className="size-4 animate-spin" /> : 'Create'}
                </Button>
            </form>
        </Form>
    );
};

export default CreateCoursesForm;


// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { courseSchema } from '@/validators/coursesSchema';

// import {
//     Form,
//     FormControl,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react';

// export type FormValues = z.input<typeof courseSchema>;

// const CreateCoursesForm = ({
//     onSubmit,
//     disabled,
// }: {
//     onSubmit: (formValus: FormValues) => void;
//     disabled: boolean;
//     }) => {
    
//         const form = useForm<z.infer<typeof courseSchema>>({
//             resolver: zodResolver(courseSchema),
//             defaultValues: {
//                 title: '',
//                 description: ''
//             },
//         });
    
//     // const fileRef = `${, ${form.register('videoFile')}`;
//     const fileRef = form.register('image');
//     const fileRefe = form.register('videoFile');
    
//         const handleSubmit = (values: FormValues) => {
//             onsubmit(values);
//         };
//     return (
//         <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//             <FormField
//                 control={form.control}
//                 name="tittle"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Name</FormLabel>
//                         <FormControl>
//                             <Input placeholder="e.g. tittle" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//             <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Description</FormLabel>
//                         <FormControl>
//                             <Textarea {...field} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//             <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Image</FormLabel>
//                         <FormControl>
//                             <Input type="file" {...fileRefe} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//              <FormField
//                 control={form.control}
//                 name="video"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Image</FormLabel>
//                         <FormControl>
//                             <Input type="file" {...fileRef} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />

//             <Button className="w-full" disabled={disabled}>
//                 {disabled ? <Loader2 className="size-4 animate-spin" /> : 'Create'}
//             </Button>
//         </form>
//     </Form>
//     )
// }

// export default CreateCoursesForm
