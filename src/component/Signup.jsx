import React, { useState } from 'react'
import { Mail, Home, Lock, MapPin, User, Loader  } from 'lucide-react'
import { useForm } from 'react-hook-form'
import authService from '../../../tshirt/src/Appwrite/Authentication'
import { data, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout } from '../Redux Slices/authSlice'
import Service from '../Appwrite/Config'


export const Signup = (props) => {
    const { register, handleSubmit} = useForm()
    const [ error, setError ] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

  const signin = async (data) => {
    
    try {
        setError('')
        setLoading(true)
        const response = await authService.createAccount(data)
        if (response) {
            const userData = await authService.getCurrentUser();
            
            const userInfo = await Service.storeUser({
              userId: userData.$id,
              address: data?.address,
              pincode: parseInt(data?.pincode),
              countryCode: parseInt(data?.countryCode),
              mobile: data?.phone,
            })
            setLoading(false)
            if (userInfo) {
              navigate('/')
              dispatch(login(userData))
           }
          

        }else{
           dispatch(logout())
        }
    } catch (error) {
      setLoading(false)

        setError(error.message)
    }
  }


  return (
<div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
{!loading ? (<div className="bg-white transition-all duration-300 rounded-2xl w-full max-w-md min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] p-6 shadow-2xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-1 tracking-tight text-gray-800">
          Hello! <span className="ml-1">👋</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your details to complete your profile
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit(signin)}>
         
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <select
      {...register("countryCode", { required: true })}
      className="bg-transparent text-sm outline-none"
    >
      <option value="+91">+91</option>
      <option value="+1">+1</option>
      <option value="+44">+44</option>
      <option value="+61">+61</option>
      <option value="+971">+971</option>
    </select>
            <input
              type='tel'
              className="flex-1 bg-transparent h-8 text-sm outline-none"
              {
                ...register('phone', {
                  required:true
                })
              }
            />

          </div>

          {/* Name with Prefix Dropdown */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
             <User className="w-6 h-6 text-gray-400" />             
            <input
              type="text"
              placeholder="Your name"
              className="flex-1 outline-none h-8 text-sm text-gray-700"
              {
                ...register('name', {
                  required:true
                })
              }
            />
          </div>

          
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="w-6 h-6 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 outline-none h-8 text-sm text-gray-700"
              {...register('email', {
                required: true,
                 validate: {
                  validEmail: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid Email",
                 }
      
              })}
            />
          </div>
          <div className="flex items-center relative gap-2 border border-gray-300 rounded-md px-3 py-2 mb-5 bg-white focus-within:ring-2 focus-within:ring-blue-500">
          <Lock className="w-6 h-6 text-gray-400" />
          <input
            type='text'
            placeholder="Password"
            className="flex-1 outline-none h-8 text-sm text-gray-700"
            {...register('password', {
              required: true,
              minLength: 4,
              maxLength: 20
            })}
          />


        </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <Home className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your address"
              className="flex-1 outline-none h-8 text-sm text-gray-700"
              {
                ...register('address', {
                  required:true
                })
              }
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <MapPin  className="w-6 h-6 text-gray-400" />
            <input
             type="tel"
             step='none'
             maxLength={6}
             inputMode="numeric"
              placeholder="Enter your Pincode"
              className="flex-1 outline-none h-8 text-sm text-gray-700"
              {...register('pincode', {
                required:true
              })}
            />
          </div>


          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-rose-500 to-rose-300 text-white font-medium hover:opacity-90 transition-all"
          >
            Create Account →
          </button>
          <p className='mt-5 text-center text-gray-600 font-semibold'>Already have an account?
          <span className='cursor-pointer pl-1 text-blue-600'
          onClick={()=>navigate('/login')}>
           Login
          </span>
        </p>
        </form>
      </div>) : (
        <div className="bg-white rounded-2xl transition duration-300 w-full max-w-md p-6 shadow-2xl border min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] border-gray-100 flex justify-center items-center">

        <div className="border-8 h-20 caret-transparent w-20 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>

        </div>
      )}
      
    </div> 
  
  
  )
  }
