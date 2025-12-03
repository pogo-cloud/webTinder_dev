import { useState } from "react";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux"; 
import {useNavigate} from "react-router-dom";
import BASE_URL from "./utils/constants"

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [mobileNo,setMobileNo]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSignup=async()=>{
    try{
       const res=await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password,mobileNo},{
        withCredentials:true
       })
       dispatch(addUser(res.data.data));
       navigate("/profile");
    }catch(err){
        setError(err?.response?.data||"Something is wrong! Please try again");
    }
  }
  const handleLogin=async()=>{
    try{
       const resp=await axios.post(BASE_URL+"/login",{
        emailId,
        password
     },{
        withCredentials: true // <-- this goes here, not in the body
      }
    )
      console.log("Login success:", resp.data);
      dispatch(addUser(resp.data));
      navigate("/");
    }catch(err){
      setError(err?.response?.data||"Something is wrong! Please try again");
      console.log(err);
    }
    
  }
  return (
    <div className="flex justify-center w-100">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm?"Login":"SignUp"}</h2>
         <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className="label">*</p>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p className="label">*</p>
                </fieldset>
                 <fieldset className="fieldset">
                  <legend className="fieldset-legend">Mobile Number</legend>
                  <input
                    type="number"
                    className="input"
                    placeholder="Type here"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(Number(e.target.value))}
                  />
                  <p className="label">*</p>
                </fieldset>
              </>
            )}
          </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" className="input" placeholder="Type here"  value={emailId} onChange={(e)=>setemailId(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" placeholder="Type here" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <p className="label">*</p>
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignup}>{isLoginForm?"Login":"Sign Up"}</button>
          </div>
          <p className="m-auto curser-pointer" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"New User? Sign Up Here":"Existing User Signup Here"}</p>
        </div>
      </div>
    </div>

  )
}

export default Login;