import React, { useContext, useState } from 'react'
import { StoreContext } from './Context/StoreContext'

import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './pages/Menu/Menu'
import MobileApp from './pages/MobileApp/MobileApp'
import ContactUs from './pages/ContactUs/ContactUs'

const App = () => {

  const { showLogin, setShowLogin } = useContext(StoreContext);
  
  const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL;

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 max-w-lg text-center shadow-2xl">
          <h2 className="text-tomato font-bold text-2xl mb-4">⚠️ Configuration Required</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            The Customer App cannot connect to the database. Please set the following Environment Variables in your Vercel Project Settings:
          </p>
          <div className="bg-slate-950 p-5 rounded-xl text-left mb-6 font-mono text-sm space-y-3">
            <div className="text-blue-400">1. VITE_SUPABASE_URL</div>
            <div className="text-blue-400">2. VITE_SUPABASE_ANON_KEY</div>
          </div>
          <p className="text-slate-500 text-sm">
            After updating, go to Deployments and trigger a Redeploy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup /> : <></>}

      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/menu/:category' element={<Menu />} />
          <Route path='/mobile-app' element={<MobileApp />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
