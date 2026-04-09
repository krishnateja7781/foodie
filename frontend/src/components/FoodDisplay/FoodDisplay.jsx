import React, { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='mt-[30px]' id='food-display'>
      <div className="flex justify-between items-end mb-6">
        <h2 className='text-[max(2vw,24px)] font-semibold text-white'>Top dishes near you</h2>
        <button onClick={() => navigate(`/menu/${category === 'All' ? '' : category}`)} className="text-tomato font-medium hover:text-orange-500 transition">View all →</button>
      </div>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] row-gap-[50px]'>
        {food_list
          .filter(item => category === "All" || category === item.category)
          .slice(0, 8)
          .map((item) => {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay
