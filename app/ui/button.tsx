interface buttonprops {
    size:"sm"|"lg"|"md",
    variant:"primary"|"secondary",
    title:string,
    onClick?:()=>void,
    imgSrc?:string,
    imageScale?:"scale-50"|"scale-35"|"scale-25"|"scale-10";

}
const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
const variantStyles = {
    "primary":"hover:pointer-cursor bg-slate-200 transition duration-300 delay-50 ease-in-out hover:scale-110 rounded-md hover:bg-slate-600 outline-2 outline-bg-slate-800 font-semibold text-black font-snpro",
    "secondary":"hover:pointer-cursor bg-slate-100 transition duration-300 delay-50 ease-in-out hover:scale-110 rounded-md hover:bg-slate-600 outline-2 outline-bg-zinc-800 text-black font-onest"
}
export function Button(props:buttonprops)
{
    return(
        <button
        onClick={props.onClick}
        className= {`${sizeStyles[props.size]} ${variantStyles[props.variant]} flex  items-center gap-4` }>
            {props.imgSrc && (
                <img
                src={props.imgSrc}
                className={`${props.imageScale} h-6 w-6`} />
            )}
                
        
        <span>{props.title}</span></button>
    )
}