import { useEffect } from "react";
import BASE_URL from "./utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";
import axios from "axios";

const connections=()=>{
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);
    const getConnections=async()=>{
        try{
          const res=await axios.get(BASE_URL+"/user/request/connections",{
           withCredentials:true
         })
         dispatch(addConnections(res.data.data))
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getConnections();
    },[])
    if(!connections) return;
    if(connections.length===0) return <h1>No Connections Found</h1>

         
    return (
        <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {connections.map((connection)=>{
            const {_id,firstName,lastName,photoUrl,age,gender,about}=connection;
            return( <div key={_id}className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto">
                <div>
  <img alt="photo" src={photoUrl} className="h-20 w-20 rounded-full"/>
                </div>
                <div className="font-bold text-xl">
<h2>{firstName+" "+lastName}</h2>
{age&&gender&&<p>{age+" ,"+gender}</p>}
                <p>{about}</p>
                </div>
              
                
            </div>)
        })}
       </div>
    )
    
}
export default connections