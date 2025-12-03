import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "./utils/constants";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed=()=>{
const feed=useSelector((store)=>store.feed);
   const dispatch=useDispatch();
   const userFeed=async()=>{
      if(feed) return ;
      try{
        const res=await axios.get(BASE_URL+"/user/feed",{
         withCredentials:true
      })
      dispatch(addFeed(res?.data?.data));
      }catch(err){
        // Give the the error part of the code here .
      }
      
   }
   useEffect(()=>{
      userFeed();
   },
    []
   )
   return (
    feed&&(
       <div className="flex justify-center my-10">
        <UserCard user={feed[0]}/>
      </div>
    )
   
   ) 
}

export default Feed;