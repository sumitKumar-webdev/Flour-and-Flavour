import { User2Icon } from 'lucide-react'
import React, { useEffect } from 'react'

export default function CustomAlert({message, onEnter, onclose}) {
  useEffect(()=> {
  const timer =  setTimeout(()=>{onEnter?.()}, 2000)

  return () => clearTimeout(timer)
  }, [onEnter])
  
  return (
    <div onClick={onclose} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div onClick={(e)=>e.stopPropagation()} className="bg-white rounded-2xl w-full relative max-w-sm p-6 shadow-2xl border border-gray-100 flex justify-center items-center flex-col">
        {/* Icon */}
        <div className='px-4 py-4 rounded-full bg-rose-200 mb-8'><User2Icon color='#EC407A' size={35}/></div>
        {/* Message */}
        <h2 className='text-center text-lg font-bold mb-4'>{message ?? "You Need To Login To Buy"}</h2>
        {/* Button */}
        <button onClick={onEnter} className='bg-rose-500 text-white rounded-3xl w-full px-10 py-2 '>Ok</button>
      </div>
    </div>
  )
}
