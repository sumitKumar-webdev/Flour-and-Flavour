import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './component/Header/Header'
import { Footer } from './component/Footer/Footer'
import { ProductCategory } from './component/ProductCategory'
import { Contact } from './component/Contact'
import  About  from './component/about'
import AllProducts from './component/Allproducts'
import { Product } from './component/Product'
import { Login } from './component/login'
import { Signup } from './component/Signup'
import Cart from './component/cart'
import { Outlet } from 'react-router-dom'
import { Loader } from './component/Loader'


function App() {
   const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loaderShown = sessionStorage.getItem('loaderShown')

    if (!loaderShown) {
      setShowLoader(true);
      sessionStorage.setItem("loaderShown", "true");
      const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
    }else{
      setShowLoader(false)
    }
    
  }, []);

  if (showLoader) {
    return (
    <div  className='h-screen w-full flex justify-center items-center'><Loader /></div>)
  }

  return (
    <>
    <Header />
   <Outlet />
    <Footer />
  </>
  )
}

export default App
