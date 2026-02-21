import {Card} from "./card"
export function PriorityCard()
{
    return (
        <div className="h-72 w-72 bg-slate-100 rounded-md shadow-xl">
               <p className="font-snpro font-extrabold text-black p-4">
                Categorize tasks based on urgency and
                stay focused on high-impact work
               </p>
                 <div className=" gap-2 ">
                    <div className="p-2 flex gap-4 items-center">  
                    <img src="/icons/red_circle.png"  className="h-6 w-6" />
                    <p className="font-snpro font-semibold text-gray-900">Tasks of urgent importance</p>
                    </div>
                    <div className="p-2 gap-4 flex items-center">
                    <img src="/icons/yellow_circle.png"  className="h-6 w-6" />
                    <p className="font-snpro font-semibold text-gray-900">Tasks of intermediate importance</p>
                    </div>
                    <div className="p-2 flex gap-4 items-center">
                    <img src="/icons/green_circle.png"  className="h-6 w-6" />
                    <p className="font-snpro font-semibold  text-gray-900">Tasks of less importance</p>
                    </div>
                </div>
            </div>
    )
}