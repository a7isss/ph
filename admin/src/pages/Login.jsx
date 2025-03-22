import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {
      try {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { username, password })
        console.log("Login Response:", data);
        if (data.success) {
          setAToken(data.aToken) // Use data.aToken to match the backend response
          localStorage.setItem('aToken', data.aToken) // Store the correct token in localStorage
          console.log("Stored aToken:", localStorage.getItem('aToken'));
          toast.success("Admin login successful!")
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.error("Admin login failed:", error)
        toast.error("An error occurred. Please try again.")
      }
    } else {
      try {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { username, password })
        console.log("Login Response:", data);
        if (data.success) {
          setDToken(data.token) // Assuming the doctor login still uses data.token
          localStorage.setItem('dToken', data.token)
          toast.success("Doctor login successful!")
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.error("Doctor login failed:", error)
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Username</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="text"
            required
          />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login