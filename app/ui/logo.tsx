interface logoprops {
    showtagline?:boolean
}

export function Logo(props:logoprops)
{
    return(
        <div >
            <div className="flex items-center">  
            <div>
            <img className="h-30 w-30"
            src = "/icons/checkbox.png"/>
            </div>
            <div>
            <p className="text-black text-6xl font-lexend">
            TASKBASE
            </p>
            </div>
            </div>
            {props.showtagline && (
        <p className="font-lexend text-2xl text-gray-900 translate-x-40 -translate-y-5">
            Priority-Driven Task Orchestration
        </p>
            )}
        </div>
       
    )
}