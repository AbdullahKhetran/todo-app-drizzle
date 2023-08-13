import { InferModel } from 'drizzle-orm'
import {
    pgTable,
    serial,
    varchar,
} from 'drizzle-orm/pg-core'
import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"

// Types
export const todoTable = pgTable("todos", {
    id: serial("id").primaryKey().notNull(),
    task: varchar("task", { length: 255 }).notNull()
})

// for getting data
export type Todo = InferModel<typeof todoTable>;
// for inserting data
export type NewTodo = InferModel<typeof todoTable, "insert">


// Connection
export const db = drizzle(sql)