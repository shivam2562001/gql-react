import React from 'react'




export default function AuthForm({
                 email="",
                 password = "",
                 loading,
                 setEmail=(f)=>f,
                 setPassword,
                 handleSubmit,
                 showPasswordInput = false,
                 hideEmailInput=false
               }) {
                 return (
                   <form onSubmit={handleSubmit}>
                     { !hideEmailInput &&(<div className="form-group">
                       <label>Email Address</label>
                       <input
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="form-control"
                         placeholder="Enter email"
                         disabled={loading}
                       />
                     </div>)}
                     {showPasswordInput && (
                       <div className="form-group">
                         <label>Password</label>
                         <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="form-control"
                           placeholder="Enter password"
                           disabled={loading}
                         />
                       </div>
                     )}
                     {showPasswordInput ? <button
                       className="btn btn-raised btn-primary"
                       disabled={  loading || !password}
                     >
                       Submit
                     </button>:
                     <button
                       className="btn btn-raised btn-primary"
                       disabled={!email || loading}
                     >
                       Submit
                     </button>}
                     
                   </form>
                 );
               }
