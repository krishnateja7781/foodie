import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-[100vh] border-r border-[#a9a9a9] bg-white'>
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5">
        <NavLink to='/add' className={({isActive})=>`flex items-center gap-3 border border-[#a9a9a9] border-r-0 p-2.5 rounded-[5px_0px_0px_5px] cursor-pointer transition-colors ${isActive ? 'bg-[#fff0ed] border-tomato' : 'hover:bg-slate-50'}`}>
            <img src={assets.add_icon} alt="" className="w-6" />
            <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink to='/list' className={({isActive})=>`flex items-center gap-3 border border-[#a9a9a9] border-r-0 p-2.5 rounded-[5px_0px_0px_5px] cursor-pointer transition-colors ${isActive ? 'bg-[#fff0ed] border-tomato' : 'hover:bg-slate-50'}`}>
            <img src={assets.order_icon} alt="" className="w-6" />
            <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({isActive})=>`flex items-center gap-3 border border-[#a9a9a9] border-r-0 p-2.5 rounded-[5px_0px_0px_5px] cursor-pointer transition-colors ${isActive ? 'bg-[#fff0ed] border-tomato' : 'hover:bg-slate-50'}`}>
            <img src={assets.order_icon} alt="" className="w-6" />
            <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
