import React from 'react'

/**
* @author
* @function Contact
**/

export const Contact = (props) => {
  return  (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-[#fff7f7]  text-black-1 font-syne">
      
      {/* Contact Info */}
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-amber-950 mb-4">Get in touch</h2>
        <p className="text-lg">Phone No. +91 99999999</p>
        <p className="text-lg">Local: 864-573-6003</p>
        <p className="text-lg">E-mail: <a href="mailto:caroline@carolinescakes.com" className="underline">abc@.com</a></p>
        <p className="mt-4 text-md">Monday - Friday: 9:00am - 5:00pm</p>
        <p className="text-md">Saturday - Sunday: Closed</p>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-2xl bg-gray-100 p-6 sm:p-10 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-center text-amber-950 mb-6">Contact us</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col col-span-1">
            <label htmlFor="name" className="text-sm font-medium mb-1 uppercase">Name</label>
            <input type="text" id="name" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black-1 outline-none" />
          </div>

          <div className="flex flex-col col-span-1">
            <label htmlFor="email" className="text-sm font-medium mb-1 uppercase">Email</label>
            <input type="email" id="email" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black-1 outline-none" />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="message" className="text-sm font-medium mb-1 uppercase">Message</label>
            <textarea id="message" rows="5" className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black-1 outline-none resize-none"></textarea>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-start">
            <button type="submit" className="bg-amber-900 hover:bg-amber-950 text-white py-2 px-6 rounded-md transition duration-300">
              Send
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  )
  }
