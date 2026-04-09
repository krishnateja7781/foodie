import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({ category, setCategory }) => {

  const { menu_list } = useContext(StoreContext);

  return (
    <div className='flex flex-col gap-[20px]' id='explore-menu'>
      <h1 className='text-[#e2e2e2] font-semibold text-[2rem]'>Explore our menu</h1>
      <p className='max-w-[100%] md:max-w-[60%] text-slate-400'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="flex justify-between items-center gap-[30px] text-center my-[20px] overflow-x-auto overflow-y-hidden hide-scrollbar py-2">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='cursor-pointer flex-shrink-0 group'>
              <img src={item.menu_image} className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-300 ${category === item.menu_name ? "ring-4 ring-tomato p-0.5" : "group-hover:ring-2 ring-tomato/50"}`} alt="" />
              <p className={`mt-[10px] text-[max(1.4vw,16px)] cursor-pointer transition ${category === item.menu_name ? "text-tomato font-semibold" : "text-slate-300 group-hover:text-white"}`}>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr className="my-2 border-white/10 h-[2px] bg-white/5" />
    </div>
  )
}

export default ExploreMenu
