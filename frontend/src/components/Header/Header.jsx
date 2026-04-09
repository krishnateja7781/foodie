import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets' // Assuming there is a header_img.png

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='h-[34vw] min-h-[400px] my-4 mx-auto bg-cover bg-center bg-no-repeat relative rounded-[20px] overflow-hidden' style={{backgroundImage: `url(${assets.header_img || '/header_img.png'})`}}>
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 to-transparent'></div>
            <div className='absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] md:max-w-[45%] bottom-[10%] left-[6vw] animate-fadeIn'>
                <h2 className='font-bold text-white text-[max(4.5vw,22px)] leading-tight'>Order your favourite food here</h2>
                <p className='text-white text-[1vw] hidden md:block leading-relaxed'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button onClick={() => navigate('/menu')} className="border-none text-slate-800 font-medium px-[min(2vw,20px)] py-[min(1vw,10px)] bg-white rounded-[50px] text-[max(1vw,13px)] hover:bg-[#fff4f2] transition cursor-pointer">View Menu</button>
            </div>
        </div>
    )
}

export default Header
