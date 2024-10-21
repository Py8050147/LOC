import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const queryClient = process.env.DATABASE_URL as string
export const connection = postgres(queryClient);
export const db = drizzle(connection);