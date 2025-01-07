// 'use client'
// import React, { useEffect, useRef } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getAllCourses } from '@/http/api';
// import { Courses } from '../../../../types';
// import { Loader2 } from 'lucide-react';
// import 'video.js/dist/video-js.css';
// import videojs from 'video.js';
// import Player from 'video.js/dist/types/player';

// function CoursesPage() {
//   const videoRef = useRef(null);

//   // useEffect(() => {
//     const player = videoRef.current && videojs(videoRef.current, {
//       controls: true,
//       autoplay: false,
//       preload: 'auto',
//     });

//     // return () => {
//       if (player) {
//         (player as Player).dispose();
//       }
//     // };
//   // }, []);

//   const {
//     data: courses,
//     isLoading,
//     isError,
//   } = useQuery<Courses[]>({
//     queryKey: ['courses'],
//     queryFn: getAllCourses,
//   });

//   console.log(courses);

//   return (
//     <div>
//       <h1>Courses</h1>
//       {isError && <span className="text-red-500">Something went wrong.</span>}
//       {isLoading ? (
//         <div className="flex items-center justify-center">
//           <Loader2 className="size-10 animate-spin" />
//         </div>
//       ) : (
//         <>
//           <ul>
//             {courses?.map((course) => (
//               <li key={course.id}>{course.title}</li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             {courses && courses.length > 0 && (
//               <video
//                 ref={videoRef}
//                 className="video-js vjs-default-skin"
//                 width="600"
//                 height="300"
//                 controls
//               >
//                 <source src={courses[0].videoFile} type="video/mp4" />
//               </video>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default CoursesPage;