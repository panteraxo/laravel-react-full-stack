import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function Login() {
  const emailRef=useRef();
  const passwordRef=useRef();
  const [message,setErrors] = useState(null)
  const {setUser,setToken} = useStateContext()
  const onSubmit=(ev)=>{
    ev.preventDefault()
    const payload = {
      
      email: emailRef.current.value,
      password: passwordRef.current.value,
      
         }
         
         axiosClient.post('/login',payload)
         .then(({data})=>{
           setUser(data.user)
           setToken(data.token)
         }).catch(err=>{
           const response = err.response;
           if(response && response.status === 422){
             
             setErrors(response.data.message)
           }
         })
  }
  
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
       
        <form onSubmit={onSubmit}>
        <h1 className='title'>Login into your account</h1>
        {message && <div className='alert'>
        <p>{message}</p>
        </div>

        }
          <input ref={emailRef} placeholder='Email' type="email" />
          <input ref={passwordRef} placeholder='Password' type="password" />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered?<Link to="/signup"> Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
