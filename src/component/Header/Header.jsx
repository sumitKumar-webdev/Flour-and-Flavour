import React, { useState } from 'react'
import { Search, User, ShoppingCart, User2, User2Icon, DoorClosedIcon, Menu, X, MenuIcon } from "lucide-react";
import { Logo } from '../Logo/Logo'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css'

export const Header = () => {
    const [showSlider, setShowSlider] = useState(false)
    const navigate = useNavigate();
    const cartItems = useSelector((state)=>state.cart.totalProducts)
    
    const user = useSelector((state)=>state.auth.status)

    const navLinks = [
        {
            name: 'Shop',
            path: '/shop'
        },
        {
            name: 'Customize',
            path: '/customcake'
        },
        {
            name: 'About',
            path: '/about'
        },
        {
            name: 'Contact',
            path: '/contact'
        },
        
    ]

    const handleToggle = () =>{
        setShowSlider(!showSlider)
    }
    
    return(
        <header className='w-full py-2 md:py-0 sm:py-0 border-t-[1px] relative top-0 shadow bg-black-1'>

        <nav className='flex justify-between'>
            {/* -----------------Logo--------------- */}
            <div 
           onClick={()=>navigate('/')}
            className='flex items-center cursor-pointer caret-transparent ml-4' 
            >
               <MenuIcon size={30} className='menu hidden' onClick={handleToggle}/>
               <Logo id='logo' width={100} className='ml-52'/>
            </div>

{/* ------------------------------NAv Buttons------------------------------ */}
{/* Desktop NAv Buttons */}

            <div className='flex items-center' >
                <ul className='flex mt-1 space-x-12 caret-transparent pr-5 text-black text-lg navbtn'>
                {navLinks.map((link,index)=>(
                     <li
                     key={index}
                      className='cursor-pointer hover:text-rose-500'>
                        <NavLink 
                        to={link.path}
                        className={({isActive})=>`cursor-pointer ${isActive ? 'text-rose-500 font-semibold': 'text-black'} hover:text-rose-500`}
                        >
                           {link.name}
                        </NavLink> 
                    </li>
                ))}
                   
                    

                </ul>

                <ul className='flex relative space-x-4 ml-8 pr-10 duration-300 transition-transform navIcon'>
                    <li className='cursor-pointer flex justify-center items-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300' id='search'>
                        <Search size={22} color='black'/>
                    </li>

                    <li 
                    onClick={()=>user? navigate('/profile') : navigate('/login')}
                    className='cursor-pointer flex justify-center items-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300' id='userIcon'>
                        <User2Icon  size={22} color='black'/>
                    </li>
                    <li 
                    onClick={()=>navigate('/cart')}
                    className='cursor-pointer   flex justify-center items-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300' id='cart'>
                        <ShoppingCart size={22} color='black' />
                        {cartItems>0 && <div className='h-4 w-4 flex items-center justify-center text-sm text-white absolute top-0 right-10  bg-rose-500 rounded-full'>{cartItems}</div>}
                    </li>


                </ul>
               
                </div>  

{/* Slider */}

              {showSlider &&  
            //   slider box
               <div onClick={()=>setShowSlider(false)} className='fixed inset-0 bg-black/30 z-40'>
                {/* actual Slider */}
                   <div onClick={(e)=>e.stopPropagation()} className={`h-svh fixed z-50 transition-transform duration-300 ease-in-out
 top-0  w-[350px]  bg-[#fff7f7] flex flex-col ${showSlider ? 'translate-x-0' : '-translate-x-full'} slider`}>
                    {/* logo */}
                    <div className='flex w-full justify-center items-center border-b-2 caret-transparent'>
                    <Logo 
                    width={150}
                    onClick={()=>{
                        setShowSlider(false);
                         navigate('/')}}/>
                        <X onClick={handleToggle} className='cursor-pointer'/>
                    </div>
                 
       
                    
                    
                    {/* //container */}
                    <div className='relative h-full'>

                    <div className='mt-5'>
                    <ul className='flex  flex-col gap-1 justify-center items-center text-black text-lg'>
                        {
                            navLinks.map((link,index)=>(
                                <div 
                                key={index}
                                className=' hover:text-rose-500 transition-all duration-300 ease-in-out w-full'>
                                <li
                               className='cursor-pointer w-full  py-2 text-center'>
                                   <NavLink 
                                   onClick={()=>setShowSlider(false)}
                                   to={link.path}
                                   className={({isActive})=>`cursor-pointer ${isActive ? 'text-rose-500 font-semibold': 'text-black'} hover:text-rose-500`}
                                   >
                                      {link.name}
                                   </NavLink> 
                               </li>
                               </div>
                            ))
                        }
                    </ul>
                    </div>
             </div>
                    <div 
                     onClick={()=>user? navigate('/profile') : navigate('/login')}
                    className='p-5 cursor-pointer  w-full border justify-center gap-2 flex text-xl hover:border hover:border-rose-500 hover:text-rose-500 transition-all duration-300 ease-in-out '>
                        <User2Icon  size={30} color='black'/> Profile
                    </div>

                   

                </div>
              </div>
              }
               
        </nav>
  
    </header>
   )
  }
