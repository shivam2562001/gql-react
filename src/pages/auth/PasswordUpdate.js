import React, { useState } from 'react'
import  { auth } from '../../firebase'
import {toast} from 'react-toastify'
import AuthForm from '../../components/forms/AuthForm'

export default function PasswordUpdate() {
 const [password,setPassword] = useState('')
 const [loading,setLoading] = useState(false)
  
 const handleSubmit=(e)=>{
      e.preventDefault()
      setLoading(true)

      auth.currentUser.updatePassword(password)
      .then(()=>{
         setLoading(false)
         toast.success('password updated')
      }).catch(error=>{
        setLoading(false)
        toast.error(error.message)
      })
     }


  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4>:<h4>Password Update </h4>}

      <AuthForm
        password={password}
        setPassword={setPassword}
        loading={loading}
        showPasswordInput="true"
        handleSubmit={handleSubmit}
        hideEmailInput="true"
        />
    </div>
  )
}

