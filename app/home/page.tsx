"use client"
import { UserIcon } from "@/app/ui/icons/usericon"
import { Logo } from "../ui/logo"
import { useState } from "react"
import { UserProfile } from "../ui/userprofile"
import { TodoCard } from "../ui/todocard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Home() {
    const {data:session, status} = useSession()
    const [todos, setTodos] = useState<any[]>([])  
    const router = useRouter()
    const [profile, setProfile] = useState(false)
    const [blur, setBlur] = useState(false)
    const [showtodo, setShowtodo] = useState(false)
    const [showimg,setshowImg]=useState(true)
    async function fetchTasks() {
    const response = await fetch("/api/todos")
    const data = await response.json()
   
    
    if (Array.isArray(data)) {
        setTodos(data)
    } else {
        setTodos([])  
    }
}

    async function toggleComplete(id: number, completed: boolean) {
        await fetch(`/api/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed })
        })
        fetchTasks() 
    }

    async function deleteTodo(id: number) {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' })
        fetchTasks() 
    }

    useEffect(() => {
        if(status === "unauthenticated") {
            router.push("/signup")
        }
        if(session) {
            fetchTasks()
        }
    }, [status, router, session])

    if (status === "loading") return <div>Loading...</div>
    if (!session) return null

    function clickhandler() {
        setProfile(true)
        setBlur(true)
        setshowImg(false)
    }

    function crosshandler() {
        setProfile(false)
        setBlur(false)
        setshowImg(true)
    }

    function todohandler() {
        setShowtodo(false)
        setBlur(false)
        fetchTasks() 
        setshowImg(true)
    }

    function showtodohandler() {
        setShowtodo(true)
        setBlur(true)
        setshowImg(false)
    }

   
    function getPriorityColor(priority: string) {
        if (priority === "HIGH") return "bg-red-500"
        if (priority === "MEDIUM") return "bg-yellow-500"
        return "bg-green-500"
    }

    return (
        <div className="h-screen w-full bg-slate-200">
            <div className={blur ? "blur-sm" : ""}>
                <div className="h-24 w-full bg-slate-100 flex justify-center items-center">
                    <div className="scale-75 mx-auto">
                        <Logo />
                    </div>
                    <div>
                        <UserIcon onClick={clickhandler}/>
                    </div>
                </div>

                <div className="flex justify-center mt-20">
    <table className="bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-slate-700 text-white">
            <tr>
                <th className="px-6 py-4 text-left text-center border border-slate-300">Complete</th>
                <th className="px-6 py-4 text-left text-center border border-slate-300">Todos</th>
                <th className="px-6 py-4 text-left text-center border border-slate-300">Description</th>
                <th className="px-6 py-4 text-left text-center border border-slate-300">Time</th>
                <th className="px-6 py-4 text-left text-center border border-slate-300">Priority</th>
                <th className="px-6 py-4 text-left text-center border border-slate-300">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
            {todos.map((todo) => (
                <tr key={todo.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                        <input 
                            type="checkbox" 
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id, todo.completed)}
                            className="w-5 h-5 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                        />
                    </td>
                    <td className={`px-6 py-4 font-medium ${todo.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                        {todo.title}
                    </td>
                    <td className="px-6 py-4  font-medium font-snpro text-slate-600">
                        {todo.description}
                    </td>
                    <td className="px-6 py-4 font-medium font-snpro capitalize text-slate-600">
                        {todo.category}
                    </td>
                    <td className="px-6 py-4">
                        <div className={`h-4 w-4 rounded-full ${getPriorityColor(todo.priority)}`}></div>
                    </td>
                    <td className="px-8 py-4">
                        <button 
                            onClick={() => deleteTodo(todo.id)}
                            className="px-4 py-2 bg-slate-400 text-white rounded-md hover:bg-slate-600 transition font-medium"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
{showimg && (<div className="fixed bottom-8 right-10 z-50">
    <button onClick={showtodohandler} className="hover:scale-110 transition">
        <img 
            src="/icons/add-button.png" 
            className="h-20 w-20" 
        />
    </button>
</div>
)}
</div>


          {showtodo && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <TodoCard onTrigger={todohandler} onSuccess={fetchTasks}/>
    </div>
)}


            {profile && (
                <div className="flex justify-end mr-10 -mt-40 ">
                    <UserProfile onTrigger={crosshandler}/>
                </div>
            )}
        </div>
    )
}