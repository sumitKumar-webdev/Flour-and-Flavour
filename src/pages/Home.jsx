import React from 'react'
import { ProductCategory } from '../component/ProductCategory'
import { useNavigate } from 'react-router-dom'
import './styleSheet/Home.css'
import { AnimatePresence, motion} from 'framer-motion'
import CustomBtn from '../component/CustomBtn'


export const HomePage = () => {
  const navigate = useNavigate()
  return(
    <>
    <div 
    className='bg-[url(https://fra.cloud.appwrite.io/v1/storage/buckets/67ed8720001931644743/files/67fe989b0015fdb68fb9/view?project=67ed86fc00017157ffb3&mode=any)] bg-cover banner bg-center h-[38rem] md:h-[30rem] sm:h-[28rem] flex justify-center border rounded-xl items-center'
    role='banner'
    aria-label='Banner'>
      <div className='w-full flex flex-col justify-center items-center h-full bg-gradient-to-t from-stone-600 to-transparent'>
        <h1 className="text-6xl caret-transparent md:text-6xl sm:text-5xl font-bold font-syne text-center text-white">
        Custom Cakes & More
       </h1>
       <p className='text-lg caret-transparent md:text-lg sm:text-base font-bold font-syne text-center text-white mb-10'>Create something sweet just for you</p>

       <CustomBtn 
       onClick={()=>navigate('/customcake')} 
       text='🎂 Start Custom Order'
       className='px-4 py-5 sm:px-3 sm:py-4 rounded-3xl sm:text-sm font-semibold'
       />

    </div>
    
    </div>
    <div className="bg-[#fff7f7] px-4 py-8 md:px-10 lg:px-20 space-y-10">

      <ProductCategory
        Category="veg"
        sectionTitle="Pure Veg Cakes"
        button={true}
      />
      <ProductCategory
        Category="Egged"
        sectionTitle="Egg Based Cakes"
        button={true}
      />   
    </div>
    </>
   )
  }
