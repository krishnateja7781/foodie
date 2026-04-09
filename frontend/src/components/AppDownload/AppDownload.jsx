import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='flex flex-col items-center justify-center m-auto mt-[100px] text-[max(3vw,20px)] font-medium text-center' id='app-download'>
            <p>For Better Experience Download <br />Foodie App</p>
            <div className="flex justify-center flex-wrap gap-[min(2vw,10px)] mt-10">
                <img className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer hover:scale-105 transition duration-300" src={assets.play_store} alt="" />
                <img className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer hover:scale-105 transition duration-300" src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
