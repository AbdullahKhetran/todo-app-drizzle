import { todoTable, db } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { eq } from "drizzle-orm";


export async function GET(request: NextRequest) {
    // console.log("GET function hit")

    try {
        await sql`CREATE TABLE IF NOT EXISTS Todos(id  serial, Task varchar(255));`
        const res = await db.select().from(todoTable)
        // console.log(res)
        return NextResponse.json(res)

    } catch (err) {
        // console.log("error",err)
        // console.log((err as { message: string }).message)
        return NextResponse.json("Something went wrong in GET request")
    }

}

export async function POST(request: NextRequest) {
    // console.log("POST function hit")
    const req = await request.json();
    try {
        if (req.task) {
            // const res = await sql`INSERT INTO Todos(Task) VALUES(${req.task})`
            const res = await db.insert(todoTable).values({
                task: req.task
            }).returning();
            console.log(res)
            return NextResponse.json({ message: "Todo created sucessfully" })
        } else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}


export async function DELETE(request: any) {
    // console.log("DELETE function hit")

    // extracting id from query parameter
    const params = request.nextUrl.searchParams
    // console.log("params", params)
    const paramTodoId = Number(params.get("id"))
    // console.log("paramTodoId", paramTodoId)


    try {
        if (!paramTodoId) {
            throw new Error('ID parameter is missing');
        }
        await db.delete(todoTable).where(eq(todoTable.id, paramTodoId));
        // console.log(paramTodoId)
        return NextResponse.json({message: "Todo item deleted sucessfully"})  

    } catch (err) {
        // console.error(err);
        return NextResponse.json({ error: 'Failed to delete the todo item' });
    }
}