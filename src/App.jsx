import { useState, useEffect } from 'react'
import './App.css'
import { Header } from './component/Header/Header'
import { Footer } from './component/Footer/Footer'
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
