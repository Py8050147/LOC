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
    role: varchar('role', { length: 12 }).notNull().default('user'), 
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 500 }).notNull(),
    description: text('description'),
    image: text('image'),
    videoFile: text('videoFile'),
    instructorId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})