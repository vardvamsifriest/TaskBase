interface inputBox
{
  placeholder:string,
  title:string,
  value?:string,
  onChange?:(value:string)=>void
}

export function InputBox(props:inputBox)
{
    return (
       <div>
        <div >
        <label className="font-snpro font-semibold">
             {props.title}:
        </label>
        </div> 
        <input type="text" placeholder={props.placeholder}
        value={props.value} onChange={(e)=>props.onChange?.(e.target.value)} />
        </div>
    )
}