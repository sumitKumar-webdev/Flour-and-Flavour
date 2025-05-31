import React from 'react';
import { Logo } from '../Logo/Logo';
import { Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
//   const navigate = useNavigate();

  const scrollAndNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='w-full border-t bg-white text-brown-900 py-10'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8'>

        {/* Logo & Tagline */}
        <div className='cursor-pointer' onClick={() => scrollAndNavigate('/')}>
          <Logo width={180} />
          <p className='mt-3 text-sm text-gray-700 max-w-xs'>
            Freshly baked delights crafted with love. Taste the joy, savor the story.
          </p>
        </div>

        <div className='ml-40'>
          <h2 className='font-semibold text-xl mb-3'>Quick Links</h2>
          <ul className='space-y-2  text-lg'>
            <li className='cursor-pointer hover:text-brown-700' onClick={() => scrollAndNavigate('/')}>Home</li>
            <li className='cursor-pointer hover:text-brown-700' onClick={() => scrollAndNavigate('/about')}>About</li>
            <li className='cursor-pointer hover:text-brown-700' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Cakes</li>
            <li className='cursor-pointer hover:text-brown-700' onClick={() => scrollAndNavigate('/contact')}>Contact</li>
          </ul>
        </div>

        <div className='ml-40'>
          <h2 className='font-semibold text-xl mb-3'>Contact Us</h2>
          <ul className='space-y-2'>
            <li className='flex items-center gap-2'><Phone size={18} /> +91 99999 99999</li>
            <li className='flex items-center gap-2'><Mail size={18} /> hello@flourflavour.com</li>
            <li>
              Akshya Nagar 1st Block, 1st Cross, <br />
              Rammurthy Nagar, Bangalore - 560016
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='mt-10 border-t pt-4 text-center text-xs text-gray-600'>
        © 2024 - 2025 <span className='font-medium'>Flour & Flavour</span>. All rights reserved.
      </div>
    </footer>
  );
};
