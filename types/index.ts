export interface Course
{
    id: number;
    title: string;
    description: string;
    image: string;
    videoFile?: string;
}

export interface Notes {
    id: number;
    title: string;
    description: string;
}

export interface Community {
    id: number;
    content: string;
    userId: number;
    courseId: number;
    image?: string | undefined;
}

// Comment type for the database structure
export type Comment = {
    id: number; // Primary key
    userId: number; // User who created the comment
    courseId?: number | null; // Optional: Belongs to a course
    content: string; // The content of the comment
    createdAt: Date; // Timestamp for when the comment was created
    updatedAt: Date; // Timestamp for when the comment was last updated
  };
  
  // Input type for creating a new comment (without `id`, `createdAt`, or `updatedAt`)
  export type CreateCommentInput = {
    userId: number; // User creating the comment
    communityId?: number | null; // Optional: Belongs to a community
    courseId?: number | null; // Optional: Belongs to a course
    content: string; // Content of the comment
  };
  
  // Type for fetching a comment with joined fields (for responses)
  export type CommentWithDetails = {
    id: number;
    content: string;
    username: string; // Fetched from the `users` table
    userimage: string | null; // Fetched from the `users` table
    course: string | null; // Fetched from the `courses` table
    community: string | null; // Fetched from the `community` table
    createdAt: Date;
    updatedAt: Date;
  };
  