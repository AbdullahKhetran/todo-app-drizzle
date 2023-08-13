import AddTodo from "@/components/AddTodo"
import TodoList from "@/components/TodoList"

export default function Home() {
  return (
    <main className='bg-gradient-to-tr from-pink to-orange h-screen
    flex justify-center items-center'>
      <div className='px-6 py-8 rounded-xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/60  backdrop-blur-xl w-full max-w-md'>


        {/* <TodoList /> */}

        <AddTodo />

        {/* Bar */}
        <div className='w-1/2 h-1.5 bg-black/80 rounded mx-auto mt-6'></div>
      </div>
    </main>
  )

}
