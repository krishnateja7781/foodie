import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {

    const { cartItems = {}, addToCart, removeFromCart } = useContext(StoreContext);
    const cart = cartItems || {};
    
    // Check if the image is a URL (from Supabase) or local
    const imageSrc = image.includes('http') ? image : `https://occbadmrsvvfiotijgzx.supabase.co/storage/v1/object/public/food/products/${image}`

    return (
        <div className='w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] hover:shadow-2xl transition-all duration-300 animate-fadeIn bg-slate-800 border border-slate-700 overflow-hidden group hover:-translate-y-1'>
            <div className='relative'>
                <img className='w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500' src={imageSrc} alt="" />
                {!cart[id]
                    ? <img className='w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full p-2 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className="absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-slate-800/80 backdrop-blur-md">
                        <img className="w-[30px] cursor-pointer" src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                        <p className="w-5 text-center font-medium text-white">{cart[id]}</p>
                        <img className="w-[30px] cursor-pointer" src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="p-5 flex flex-col justify-between h-[150px]">
                <div className="flex justify-between items-center mb-[10px]">
                    <p className="text-[20px] font-medium text-white line-clamp-1 truncate pr-2">{name}</p> 
                    <img className="w-[70px] shrink-0" src={assets.rating_starts} alt="" />
                </div>
                <p className="text-[#a0a4b0] text-[13px] line-clamp-2">{desc}</p>
                <p className="text-tomato text-[22px] font-medium mt-auto mb-0">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
