import React, { useState } from 'react'
import Axios from "axios"
import {useNavigate,Link} from 'react-router-dom';
import "./Register.css"

const Register = ({setLoginUser}) => {
    const navigate = useNavigate()
    const [user,setUser]= useState({
      name:"",
      email:"",
      password:"",
      reEnterPassword:"",
      phone:""
    })
    const handleChange =(event)=>{
      // console.log(event.target)
      const {name , value} = event.target
      // console.log(name , value)
      setUser({
        ...user,
        [name]:value
      })
    }

    const register = async () =>{
        const {name,email,password,reEnterPassword,phone} = user
        if(name && email && password && (password===reEnterPassword) && phone){
           Axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`,{
            name:user.name,
            email:user.email,
            passwordHash:user.password,
            phone:user.phone
        }).then(res =>{
          // console.log(res)
          alert(res.data.msg)
          setLoginUser(res.data)
          navigate('/')
        })
        }else{
          alert('invlid input')
        }
       
      }
  return (
    <div className='register template d-flex justify-content-center align-items-center  vh-100 min-vh-91 ' >
    <div className='form_container p-4 rounded bg-white'>
        <h3 className='text-center'>Sing Up</h3>
        <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <input type="text"  name="name" value={user.name} onChange={handleChange} placeholder='Enter name' className='form-control' />
        </div>
        <div className='mb-2'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={user.email} onChange={handleChange} placeholder='Enter Email' className='form-control' />
        </div>
        <div className='mb-2'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' value={user.password} onChange={handleChange} placeholder='Enter Password' className='form-control' />
        </div>
        <div className='mb-2'>
            <label htmlFor="reEnterPassword">Password</label>
            <input type="password" name='reEnterPassword' value={user.reEnterPassword} onChange={handleChange} placeholder='Re-enter Password' className='form-control' />
        </div>
        <div className='mb-2'>
            <label htmlFor="phone">Phone</label>
            <input type="tel" name='phone' value={user.phone} onChange={handleChange} placeholder='Your Phone Number' className='form-control' />
        </div>
        <div className='d-grid'>
           <button onClick={register} className='btn btn-primary'>Sign Up</button> 
        </div>
        <p className='text-end mt-9'>
           Already Registerd <Link to="/">Sing In</Link>
        </p>

    </div>
</div>
  )
}

export default Register
