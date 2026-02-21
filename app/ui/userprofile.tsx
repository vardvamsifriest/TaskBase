import { Card } from "./card"
import { CrossIcon } from "./icons/crossicon"
interface profileprops {
    onTrigger:()=>void;
}
export function UserProfile(props:profileprops)
{
    return (
        <Card size="lg" description="User Profile" icon={<CrossIcon onClick={props.onTrigger}/>} button/>
    )
}