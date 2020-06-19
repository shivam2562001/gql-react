import React,{useState} from 'react'
import {auth} from '../../firebase'
import { toast } from "react-toastify";
import AuthForm from '../../components/forms/AuthForm'

export default function Register(){
     const [email, setEmail] = useState("");
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true)
       const config = {
         url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
         handleCodeInApp: true,
       };
       await auth.sendSignInLinkToEmail(email,config)
       //show toast notification to user
       toast.success(
         `Email is sent to ${email}.click the link to complete the registration`,
         {
           position: "top-center",
         }
       );
       //save user email to local storage
       window.localStorage.setItem('emailForRegistration',email)
       //clear state
       setEmail('');
       setLoading('');
     };
   return (
     <div className="container p-5">
       {loading ? (
         <h4 className="text-danger">Loading!!!</h4>
       ) : (
         <h3>Register</h3>
       )}
       <AuthForm email={email} loading={loading} setEmail={setEmail} handleSubmit={handleSubmit}/>
     </div>
   );
}