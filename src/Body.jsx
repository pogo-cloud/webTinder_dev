import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Body=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=useSelector((store)=>store.user);
    const fetchUser=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/profile/view",{
            withCredentials:true
        })
        dispatch(addUser(res.data));
        }
        catch(err){
          if(err.status===401){
            navigate("/login");
          }
          
          console.log(err);
        }
        
    }
    useEffect(()=>{
        if(!userData){
           fetchUser();
        }
    },[])
    return (
        <div className="pt-20 pb-24 min-h-[calc(100vh-6rem)]">
         <Navbar/>
           <main className="flex-1 pt-20 pb-24 min-h-[calc(100vh-6rem)]">
           <Outlet />
           </main>
         <Footer/>
        </div>
    )
}

export default Body;