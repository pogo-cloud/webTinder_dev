import { useDispatch,useSelector } from "react-redux";
import BASE_URL from "./utils/constants";
import { addRequests, removeRequest } from "./utils/requestSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const requests=()=>{
    const dispatch=useDispatch();
    //const [showButton,setShowButtons]=useState(true);
     const requests=useSelector((store)=>store.requests);
    const userRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests/recieved",{
                withCredentials: true
            })
            console.log(res.data);
            dispatch(addRequests(res.data.data));
        }catch(err){
           console.log(err);
        }
    }
    const reviewRequests=async(status,_id)=>{
        try{
         const res=await axios.post(BASE_URL+"/request/review/"+_id+"/"+status,{},{
            withCredentials:true
         })
         dispatch(removeRequest(_id));
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
       userRequests();
    },[])
    if(!requests) return;
    if(requests.length===0) return <h1>No Connection Request Found</h1>

    return (
        <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
        {requests.map((request)=>{
            const {_id,firstName,lastName,photoUrl,age,gender,about}=request.senderID;
            return(<div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                <div>
  <img alt="photo" src={photoUrl} className="h-20 w-20 rounded-full"/>
                </div>
                <div className="font-bold text-xl">
<h2>{firstName+" "+lastName}</h2>
{age&&gender&&<p>{age+" ,"+gender}</p>}
                <p>{about}</p>
                </div>
              <div>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequests("rejected",request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
              </div>
                
            </div>)
        })}
       </div>
    )
  
}

export default requests;