"use client"
require('dotenv').config
import { Todo } from "@/lib/drizzle";
import trasbin from "@/public/trashbin.svg"
import Image from "next/image";
import { useEffect, useState } from "react";


const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const getData = async () => {
        // in server components absolute url path is needed so will construct that    
        const deployedURL = process.env.REACT_APP_URL    
        // let isLocalHost: boolean = false    
        let isLocalHost: boolean = true    
        if (typeof window === undefined) {
            isLocalHost = true
        }    
        const siteUrl = isLocalHost ? "http://localhost:3000" : deployedURL
    
        try {
            const res = await fetch(`${siteUrl}/api/todo`, {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                throw new Error("Failed to fetch the data")
            };
            const result: Todo[] = await res.json()
            setTodos(result)
    
        } catch (err) {
            console.log(err)
            throw err
        }    
    }

    useEffect(() => {
        getData();
    }, []);


    const handleDelete = async (id: number) => {
        try {
            // sending id as query parameter
            const res = await fetch(`/api/todo?id=${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                throw new Error('Failed to delete the todo item');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-h-[350px] overflow-auto mb-4 ">
            {
                todos.map((todo) => {
                    return (
                        <div key={todo.id} className="bg-gray-100 py-4 px-4 flex items-center gap-x-3 shadow rounded-lg my-5">
                            {/* Circle */}
                            <div className="h-3 w-3 bg-orange rounded-full"></div>
                            {/* Task Title */}
                            <p className="text-lg font-medium grow">{todo.task}</p>
                            <button onClick={() => handleDelete(todo.id)}>
                                <Image src={trasbin} alt="Icon of trash bin" height={24}/>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default TodoList

