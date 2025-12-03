import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const profile=()=>{
    const user=useSelector((store)=>store.user);
    return (
        user&&(<div>
        <EditProfile user={user}/>
     </div>)
    );


}

export default profile;