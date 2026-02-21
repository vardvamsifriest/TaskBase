import { CrossIcon } from "./icons/crossicon"
import { InputBox } from "./inputbox"
import { Button } from "./button" 
import { useState } from "react"

interface todoprops {
    onTrigger:()=>void
    onSuccess:()=>void
}

export function TodoCard(props:todoprops)
{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [category, setCategory] = useState("")

    async function handleSubmit() {
        console.log({ title, description, priority, category })
        const response = await fetch("/api/todos",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({title,description,priority,category})
        })
        if (response.ok){
          props.onTrigger()
        }
    }

    return (
        <div className="h-145 w-120 bg-slate-100 rounded-lg shadow-xl p-4 relative">
  <div className="flex items-start justify-between">
    <p className="font-snpro font-bold p-2 text-2xl">
      Create a new task
    </p>
        
    <div className="pt-2 relative z-50">
      <CrossIcon onClick={props.onTrigger} />
    </div>
    
  </div>
  <div className="p-2">
  <InputBox placeholder="name" title="Task name" value={title} onChange={setTitle}/>
  </div>
   <div className="p-2 ">
    <div>
    <label htmlFor="desc" className="font-snpro font-semibold">Task Description:</label>
    </div>
      <textarea placeholder="description" className="font-snpro" name="desc" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
  </div>
  <p className="text-xl font-snpro font-semibold">
    Select Priority:
  </p>
  <div className="flex gap-4 pt-2">
    <div>
    <img src="/icons/red_circle.png" className="h-6 w-6"/>
    </div>
    <div>
  <input type="radio" name="priority" value="HIGH" checked={priority === "HIGH"} onChange={(e) => setPriority(e.target.value)} className="font-snpro"/><label className="p-2" htmlFor="red">High Priority</label>
  </div>
  </div>
  <div className="flex gap-4 pt-2">
    <div>
    <img src="/icons/yellow_circle.png" className="h-5.5 w-5.5"/>
    </div>
    <div>
  <input type="radio" name="priority" value="MEDIUM" checked={priority === "MEDIUM"} onChange={(e) => setPriority(e.target.value)} className="font-snpro"/><label className="p-2" htmlFor="yellow">Medium Priority</label>
  </div>
  </div>
  <div className="flex gap-4 pt-2">
    <div>
    <img src="/icons/green_circle.png" className="h-6 w-6"/>
    </div>
    <div>
  <input type="radio" name="priority" value="LOW" checked={priority === "LOW"} onChange={(e) => setPriority(e.target.value)} className="font-snpro"/><label className="p-2" htmlFor="green">Low Priority</label>
  </div>
  </div>
  <p className="text-xl font-semibold font-snpro pt-2">
    Select an appropriate deadline:
  </p>
   <div className="gap-4 p-2">
  <input type="radio" name="category" value="YEARLY" checked={category === "YEARLY"} onChange={(e) => setCategory(e.target.value)} className="font-snpro"/><label className="p-2" htmlFor="yearly">Yearly task</label>
  </div>
   <div className="gap-4 p-2">
  <input type="radio" name="category" value="MONTHLY" checked={category === "MONTHLY"} onChange={(e) => setCategory(e.target.value)} className="font-snpro"/><label className="p-2" htmlFor="monthly">Monthly task</label>
  </div>
   <div className="gap-4 p-2">
  <input type="radio" name="category" value="DAILY" checked={category === "DAILY"} onChange={(e) => setCategory(e.target.value)} className="font-snpro"/><label className="p-2" htmlFor="daily">Daily task</label>
  </div>
  <div className="flex justify-center ">
      <Button size="lg" variant="primary" title="Add task" onClick={handleSubmit}/>
    </div>
  </div>

    )
}