import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'
import {createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { HomePage } from './pages/Home.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { ShopPage } from './pages/ShopPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignUpPage.jsx'
import PaymentsPage from './pages/PaymentPage.jsx'
import { CustomCakePage } from './pages/CustomCakePage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path='' element={<App/>}>
      <Route  path='/' element={<HomePage />} />
      <Route  path='about' element={<AboutPage />} />
      <Route  path='shop' element={<ShopPage />} />
      <Route  path='contact' element={<ContactPage />} />
      <Route  path='product/:productId' element={<ProductPage />} />
      <Route  path='customcake' element={<CustomCakePage />} />
      <Route  path='cart' element={<CartPage />} />
      <Route  path='login' element={<LoginPage />} />
      <Route  path='signUp' element={<SignupPage />} />
      <Route  path='payment' element={<PaymentsPage />} />
      <Route exact path='profile' element={<ProfilePage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
