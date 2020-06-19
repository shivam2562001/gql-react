import React,{useState, useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {Link,useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {auth,googleAuthProvider} from '../../firebase'
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import AuthForm from "../../components/forms/AuthForm";

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

export default function Login() {
   const {dispatch} = useContext(AuthContext)
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [loading,setLoading]=useState(false);
   const [success,setSuccess]=useState(false);
   
   let history= useHistory()

  const [userCreate] = useMutation(USER_CREATE);

   const handleSubmit=async (e)=>{
     e.preventDefault()
     setLoading(true)
     try{
       await auth.signInWithEmailAndPassword(email,password)
       .then(async result =>{
         const {user} = result
         const idTokenResult = await user.getIdTokenResult()

           dispatch({
             type: "LOGGED_IN_USER",
             payload: { email: user.email, token: idTokenResult.token },
           });
         
         //send user info to our server mongodb to either update/create
          userCreate();
         history.push('/profile');
       })
     }catch(error){
       console.log("login err",error)
       toast.error(error.message)
       setLoading(false)
     }
     
   };

   const googleLogin=()=>{
     auth.signInWithPopup(googleAuthProvider)
     .then(async result=>{
       const { user } = result;
       const idTokenResult = await user.getIdTokenResult();

       dispatch({
         type: "LOGGED_IN_USER",
         payload: { email: user.email, token: idTokenResult.token },
       });

       //send user info to our server mongodb to either update/create
        userCreate();
       history.push("/profile");

     })
   }

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading!!!</h4> : <h3>Login</h3>}
      <button
        onClick={googleLogin}
        className="btn btn-raised btn-danger mt-5"
        style={{ borderRadius: "5px" }}
      >
        Login with Google
      </button>
      <AuthForm
        email={email}
        setEmail={setEmail}
        setPassword={setPassword}
        password={password}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
      />
      <Link className="text-danger float-right" to="/password/forgot">Forgot password ?</Link>
    </div>
  );
}
