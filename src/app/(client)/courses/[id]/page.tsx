"use client";

import { getSingleCourses, getAllComments } from "@/http/api";
import { Course, Comment, CommentWithDetails } from "../../../../../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Alert } from "@/components/ui/alert";
import { Heart, MessageCircleMore, NotebookPen } from "lucide-react";
import { Createcomments } from "@/http/api";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CommentCard from "@/components/ui/comment-card";

const SingleCourses = () => {
  const params = useParams();
  const id = params?.id;

  // Fetch course details
  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ["course", id],
    queryFn: () => getSingleCourses(id as string),
    enabled: !!id,
  });

  // Fetch comments for the course
  const { data: comments, isLoading: isCommentsLoading, error: commentsError } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getAllComments(id as string),
    staleTime: 10 * 1000,
  });

  const queryClient = useQueryClient();

  // Mutation to create a comment
  const { mutate: createComment, isLoading: isCommentPosting } = useMutation({
    mutationFn: (data: Comment) => Createcomments(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      reset(); // Clear the form after submission
    },
    onError: (error: any) => {
      console.error("Failed to post comment:", error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({
    defaultValues: {
      content: "",
      userId: 8, // Replace with dynamic user ID
      courseId: id ? parseInt(id) : undefined,
    },
  });

  const onSubmit = (values: Comment) => {
    createComment(values);
  };

  if (isLoading) return <Loader message="Loading course..." />;
  if (error instanceof Error)
    return <Alert variant="destructive">{`Error: ${error.message}`}</Alert>;

  if (commentsError) return <Alert variant="destructive">{`Error loading comments: ${commentsError.message}`}</Alert>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <Card className="w-full max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold text-gray-800">
            {course?.title || "Course Title"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-0 pb-[56.25%] bg-gray-200 rounded-md overflow-hidden">
            {course?.videoFile ? (
              <video
                className="absolute top-0 left-0 w-full h-full rounded-md"
                controls
                poster={course?.image || "/default-thumbnail.jpg"}
              >
                <source src={course.videoFile} type="video/mp4" />
              </video>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-md">
                <p className="text-gray-500">No video available for this course.</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-gray-700">{course?.description}</div>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Textarea
            {...register("content", { required: "Comment is required" })}
            placeholder="Write your comment..."
          />
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
          <Button type="submit" disabled={isCommentPosting}>
            {isCommentPosting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>

      <div className="mt-8 w-full max-w-3xl">
        {isCommentsLoading ? (
          <Loader message="Loading comments..." />
        ) : (
          comments?.map((comment: CommentWithDetails) => (
              <CommentCard
              key={comment.id}
              avatarSrc={comment.userimage || "/default-avatar.jpg"}
              name={comment.username || "Unknown"}
              content={comment.content}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SingleCourses;
