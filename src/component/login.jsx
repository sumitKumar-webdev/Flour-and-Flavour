import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeClosed } from 'lucide-react'
 import { useForm } from 'react-hook-form'
import Service from '../Appwrite/Config'
import authService from '../Appwrite/appwriteAuth'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { login } from '../Redux Slices/authSlice'

export const Login = (props) => {
  const { register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState(null)

    const passVisibility = () => {
        setShowPass(!showPass);
      }

    const login = async (data) => {
      try {
        setError('')
        setLoading(true)
        const response =  await authService.login(data)
        if (response) {
         const userInfo = await authService.getCurrentUser()
        }
        setLoading(false)
        if (userInfo) {
         dispatch(login(userInfo))
        }
      } catch (error) {
        setError(error.message)
      }

    }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      {!loading ? (
          <div className="bg-white rounded-2xl w-full relative max-w-sm p-6 shadow-2xl border border-gray-100 ">
        
        <button onClick={()=>navigate('/')} className=' text-center absolute right-5 top-2 text-gray-400 hover:text-gray-700 text-lg font-semibold caret-transparent'>🗙</button>
        <h2 className="text-2xl font-bold mb-1 tracking-tight text-gray-800">
          Login / Sign In 
          <span className="ml-1">👋</span>
        </h2>
        {error && <p className="text-red-600 mt-8 mb-2 text-center">{error}</p>}
        <p className="text-sm text-gray-500 mb-7">Enter your email and password</p>

   <form onSubmit={handleSubmit(login)}>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 mb-5 bg-white focus-within:ring-2 focus-within:ring-blue-500">
          <Mail className="w-6 h-6 text-gray-300" />
          <input
            type="email"
            placeholder="Email address"
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
          <Lock className="w-6 h-6 text-gray-300" />
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            className="flex-1 outline-none h-8 text-sm text-gray-700"
            {...register('password', {
              required: true,
              minLength: 4,
              maxLength: 20
            })}
          />
         {showPass? <Eye onClick={passVisibility}/> : <EyeClosed onClick={passVisibility}/>}

        </div>

        <button
        type='submit'
          className="w-full py-3 rounded-md bg-gradient-to-r from-rose-500 to-rose-300 text-white font-medium hover:opacity-90 transition-all"
        >
          Login →
        </button>
        <p className='mt-5 text-center text-gray-600 font-semibold'>Don't have account ? 
          <span className='cursor-pointer text-blue-600'
          onClick={()=>navigate('/signUp')}>
            Sign Up
          </span>
        </p>

        <p className="text-xs text-gray-500 mt-5 text-center">
          By continuing you agree to our{' '}
          <a href="#" className="underline font-medium text-gray-600">
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="underline font-medium text-gray-600">
            Privacy Policy
          </a>
        </p>
        </form>
      </div>) : (
        // Loader
        <div className="bg-white rounded-2xl transition duration-300 w-full max-w-md p-6 shadow-2xl border min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] border-gray-100 flex justify-center items-center">

        <div className="border-8 h-20 caret-transparent w-20 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>

        </div>)}
    

    </div>
  )
  }
