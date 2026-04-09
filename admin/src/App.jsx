import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='bg-slate-50 min-h-screen text-slate-800 font-sans'>
      <ToastContainer/>
      <Navbar/>
      <hr className='border-slate-200 m-0 shadow-sm' />
      <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
        <Sidebar/>
        <div className="w-[70%] text-[#6d6d6d] text-base mx-auto p-4 md:p-12 min-h-full">
            <Routes>
                <Route path="/add" element={<Add/>}/>
                <Route path="/list" element={<List/>}/>
                <Route path="/orders" element={<Orders/>}/>
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
