import { useState } from "react";
import UserCard from "./userCard";
import BASE_URL from "./utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addFeed } from "./utils/feedSlice";  

const EditProfile=({user})=>{
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age||"");
  const [gender, setGender] = useState(user.gender||"");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [error,setError]=useState("");
  const [showtoast,setShowToast]=useState(false);
  const dispatch=useDispatch();
  const saveProfile=async()=>{
    setError("");
    console.log("API has been hit ");
    try{
       console.log("Going inside try block");
         const res=await axios.patch(
        BASE_URL+"/profile/edit"        
       ,{
        firstName,
        lastName,
        photoUrl,
        about
       }
       ,{
        withCredentials:true
       }
    )
  
    console.log("API has been executed ");
     dispatch(addFeed(res?.data?.data));
     console.log("About to show toast");
     setShowToast(true);
      console.log("Showtoast set true");
     setTimeout(()=>{
       setShowToast(false);
     },3000)

    }catch(err){
       setError(err.response.data);
    }
   
  }
  return (
    <>
    <div className="flex justify-center py-15">
    <div className="flex justify-center w-100 mx-10">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" className="input" placeholder="Type here"  value={firstName} onChange={(e)=>setfirstName(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e)=>setlastName(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo Url</legend>
            <input type="text" className="input" placeholder="Type here" value={photoUrl} onChange={(e)=>setphotoUrl(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input type="text" className="input" placeholder="Type here" value={age} onChange={(e)=>setAge(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input type="text" className="input" placeholder="Type here" value={gender} onChange={(e)=>setGender(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input type="text" className="input" placeholder="Type here" value={about} onChange={(e)=>setAbout(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
          <div className="justify-end card-actions">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
    </div>
    {showtoast && (
  <div id="debug-toast" style={{
    position: "fixed",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 99999,
    background: "rgba(16,185,129,0.95)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
  }}>
    Profile Saved Successfully.
  </div>
)}
    {/* {showtoast&&(<div className="toast toast-top toast-center">
    <div className="alert alert-success">
        <span>Profile Saved Succesfully.</span>
    </div>
    </div>)} */}
    </>

  )
}

export default EditProfile;