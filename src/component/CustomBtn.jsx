import React from 'react'

export default function CustomBtn ({className='', text='Click Here', onClick, ...props }) {
  return (
    <button {...props} onClick={onClick} className={`bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg transition duration-600 ease-in-out hover:from-rose-600 hover:to-rose-500 text-white py-3 font-semibold text-lg hover:opacity-90 ${className}`}>{text}</button>
  )
}
