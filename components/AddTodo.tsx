"use client"
import React, { useState, useTransition } from 'react'
import Image from "next/image"
import arrow from "@/public/arrow.svg"

const AddTodo = ({onAddTodo}: any) => {
    const [task, setTask] = useState("");

    const handleSubmit = async () => {
        try {
            if (task) {
                const res = await fetch("/api/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        task: task
                    }),
                })                
            }
            // fetches fresh data and re-renders component to update ui
            onAddTodo()
            // empties the input box
            setTask("")
        } catch (error) {
            console.log("error")
        }

    }

    return (
        <div>
            <form className='w-full flex gap-x-3'>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value )}                    
                    className='rounded-full w-full py-3.5 px-5 border focus:outline-orange' type="text" 
                />
                <button type='button' onClick={handleSubmit} className='p-4 shrink-0 rounded-full bg-gradient-to-b from-pink to-orange' >
                    <Image src={arrow} width={20} height={20} alt='vector' />
                </button>
            </form>

        </div>
    )
}

export default AddTodo