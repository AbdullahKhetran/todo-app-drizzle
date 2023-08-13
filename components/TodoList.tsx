import { Todo } from "@/lib/drizzle";

const getData = async (): Promise<Todo[]> => {
    try {
        const res = await fetch("http://127.0.0.1:3000/api/todo", {
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

        return result
    } catch (err) {
        // console.log(err)
        throw err
    }

}

const TodoList = async () => {

    const res = await getData();

    return (

        <div className="max-h-[350px] overflow-auto mb-4 ">

            {
                res.map((item) => {
                    return (
                        <div key={item.id} className="bg-gray-100 py-4 px-4 flex items-center gap-x-3 shadow rounded-lg my-5">
                            {/* Circle */}
                            <div className="h-3 w-3 bg-orange rounded-full"></div>
                            {/* Task Title */}
                            <p className="text-lg font-medium">{item.task}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default TodoList

