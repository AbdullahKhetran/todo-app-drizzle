"use client"
require('dotenv').config
import { Todo } from "@/lib/drizzle";
import trasbin from "@/public/trashbin.svg"
import Image from "next/image";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";


const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    // fetch data
    const getData = async () => {
    
        try {
            const res = await fetch(`api/todo`, {
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

    // this ensures that getData function only runs once
    // if called directly then endless loop
    useEffect(() => {
        getData();
    }, []);


    // get fresh data after adding a new todo; ui also gets updated
    const handleAddTodo = async () => {
        await getData();
    };


    // send a request to delete data
    const handleDelete = async (id: number) => {
        try {
            // sending id as query parameter
            const res = await fetch(`/api/todo?id=${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                throw new Error('Failed to delete the todo item');
            }
            // update todos array so componenet re-renders
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
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

            <AddTodo onAddTodo={handleAddTodo}/>
        </div>
    )
}


export default TodoList

