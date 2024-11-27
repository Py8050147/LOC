import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar, } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fname: varchar('fname', { length: 100 }).notNull(),
    lname: varchar('lname', {length: 100}).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    provider: varchar('provider', { length: 20 }),
    externalId: varchar('externalId', { length: 100 }).notNull(), 
    image: text('image'),
    role: varchar('role', { length: 12 }).notNull().default('admin'), 
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 500 }).notNull(),
    description: text('description'),
    image: text('image'),
    videoFile: text('videoFile'),
    instructorId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    content: text('content'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const community = pgTable('community', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    content: text('content'),
    image: text('image'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const tweets = pgTable('tweets', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    communityId: integer('community_id').references(() => community.id, { onDelete: 'cascade' }).notNull(),
    content: text('content'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

// this models create online Ide (codeEditor)
export const ideSessions = pgTable('ideSessions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    courseId: integer('courseId_id').references(() => courses.id, {onDelete: 'set null'}),
    sessionData: text('sessionData'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const comments = pgTable('comments', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    tweetId: integer('tweet_Id').references(() => tweets.id, { onDelete: 'cascade' }).notNull(),
    communityId: integer('community_Id').references(() => community.id, {onDelete: 'cascade'}).notNull(),
    content: text('content'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const likes = pgTable('likes', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    tweetId: integer('tweet_id').references(() => tweets.id, { onDelete: 'cascade' }).notNull(),
    communityId: integer('community_id').references(() => community.id, { onDelete: 'cascade' }).notNull(),
    coursesId: integer('courses_Id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})
