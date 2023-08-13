import { todoTable, db } from "@/lib/drizzle";
// import { db } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(request: NextRequest) {

    try {
        await sql`CREATE TABLE IF NOT EXISTS Todos(id  serial, Task varchar(255));`
        const res = await db.select().from(todoTable)
        // console.log(res)
        return NextResponse.json(res)

    } catch (err) {
        // console.log(err)
        console.log((err as { message: string }).message)
        return NextResponse.json("Something went wrong")
    }


}

export async function POST(request: NextRequest) {
    const req = await request.json();
    try {
        if (req.task) {
            // const res = await sql`INSERT INTO Todos(Task) VALUES(${req.task})`
            const res = await db.insert(todoTable).values({
                task: req.task
            }).returning();
            console.log(res)
            return NextResponse.json({ message: "Data added sucessfully" })
        } else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}