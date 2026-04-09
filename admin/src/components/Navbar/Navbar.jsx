import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-[4%] bg-white shadow-sm'>
      <div className="flex flex-col">
        <h1 className="text-tomato font-bold text-3xl">Tomato.</h1>
        <p className="text-slate-500 font-medium text-sm tracking-widest pl-1">Admin Panel</p>
      </div>
      <img className='w-10 h-10 object-cover rounded-full border border-slate-200 shadow-sm' src={assets.profile_image || "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"} alt="Profile" />
    </div>
  )
}

export default Navbar
