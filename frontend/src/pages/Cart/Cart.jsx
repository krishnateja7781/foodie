import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems = {}, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='mt-[100px] mb-24'>
      <div className="mb-12 overflow-x-auto">
        <div className="grid grid-cols-6 items-center text-slate-400 text-[1vw] w-[900px] md:w-full border-b border-white/10 pb-4">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-6 items-center text-[1vw] m-[10px_0px] text-white w-[900px] md:w-full">
                  <img src={item.image.includes('http') ? item.image : `https://occbadmrsvvfiotijgzx.supabase.co/storage/v1/object/public/food/products/${item.image}`} className="w-[50px] rounded-lg" alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div>{cartItems[item._id]}</div>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cursor-pointer text-red-400 font-bold hover:text-red-500' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr className='h-[1px] bg-[#e2e2e2] border-none' />
              </div>
            )
          }
        })}
      </div>
      <div className="mt-[80px] flex justify-between gap-[12vw] flex-col-reverse md:flex-row">
        <div className="flex-1 flex flex-col gap-5 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h2 className="text-2xl font-bold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-slate-300 py-2"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
            <hr className="border-white/10 my-2" />
            <div className="flex justify-between text-slate-300 py-2"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 5}</p></div>
            <hr className="border-white/10 my-2" />
            <div className="flex justify-between py-2 text-lg"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
          </div>
          <button className="bg-tomato text-white w-full max-w-[250px] py-[12px] rounded-lg cursor-pointer mt-4 hover:bg-orange-600 transition" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="flex-1">
          <div>
            <p className="text-slate-300 mb-2">If you have a promo code, Enter it here</p>
            <div className='flex justify-between items-center bg-white/5 border border-white/10 rounded-lg h-12'>
              <input type="text" placeholder='promo code' className="bg-transparent border-none outline-none pl-4 text-white placeholder:text-slate-400" />
              <button className="w-[150px] h-full bg-slate-800 text-white rounded-r-lg hover:bg-slate-700 transition border-l border-white/10">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
