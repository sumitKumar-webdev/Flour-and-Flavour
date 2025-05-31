import React from 'react'
import { Cake } from 'lucide-react'

export const Loader = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 w-full">
      
      {/* Simple animated cake icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
          <Cake size={40} className="text-white" />
        </div>
        
        {/* Subtle rotating ring */}
        <div className="absolute -inset-2 border-2 border-orange-200 rounded-3xl animate-spin opacity-30" 
             style={{animationDuration: '3s'}}></div>
      </div>

      {/* Brand name */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-wide">
        Flavour & Flour
      </h2>

     
      <div className="text-gray-500 text-sm">
        Loading<span className="animate-pulse">...</span>
      </div>

    </div>
  )
}