import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='text-[#d9d9d9] bg-[#111122] flex flex-col items-center gap-5 pb-5 pt-20 mt-24 border-t border-white/5' id='footer'>
      <div className="w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-[80px]">
        <div className="flex flex-col items-start gap-5">
            <h1 className="text-tomato font-extrabold text-4xl tracking-tighter">Foodie.</h1>
            <p className="text-sm leading-relaxed text-slate-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <div className="flex gap-4">
                <img src={assets.facebook_icon} className="w-10 cursor-pointer hover:opacity-80 transition" alt="" />
                <img src={assets.twitter_icon} className="w-10 cursor-pointer hover:opacity-80 transition" alt="" />
                <img src={assets.linkedin_icon} className="w-10 cursor-pointer hover:opacity-80 transition" alt="" />
            </div>
        </div>
        <div className="flex flex-col items-start gap-5">
            <h2 className="text-white font-bold text-xl uppercase tracking-wider">COMPANY</h2>
            <ul className="flex flex-col gap-2.5 text-slate-400 text-sm">
                <li className="cursor-pointer hover:text-white transition">Home</li>
                <li className="cursor-pointer hover:text-white transition">About us</li>
                <li className="cursor-pointer hover:text-white transition">Delivery</li>
                <li className="cursor-pointer hover:text-white transition">Privacy policy</li>
            </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
            <h2 className="text-white font-bold text-xl uppercase tracking-wider">GET IN TOUCH</h2>
            <ul className="flex flex-col gap-2.5 text-slate-400 text-sm">
                <li>+1-212-456-7890</li>
                <li>contact@foodie.com</li>
            </ul>
        </div>
      </div>
      <hr className="w-full h-px bg-white/10 border-none my-5" />
      <p className="text-center text-slate-500 text-sm">Copyright 2024 © Foodie.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
