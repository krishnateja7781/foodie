import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url } from '../../assets/assets';

const Order = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    // Because we just switched db to Supabase, we don't need reverse if backend sorts it, but safe.
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(`${url}/api/order/status`,{
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders();
      toast.success("Status Updated");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='mt-8'>
      <h3 className="font-bold text-2xl mb-6 text-slate-800">Order Management</h3>
      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-6 border border-slate-200 p-6 rounded-2xl text-sm bg-white shadow-sm hover:shadow-md transition'>
            <img src={assets.parcel_icon} className="w-12 h-12" alt="" />
            <div>
              <p className='font-semibold text-slate-800 mb-2'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
                </p>
              <p className='font-bold text-slate-700 mt-4 mb-1'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className='text-slate-600 mb-2'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='text-slate-600 font-medium'>📞 {order.address.phone}</p>
            </div>
            <div className="flex flex-col justify-center h-full">
                <p className="text-slate-600 font-medium">Items : {order.items.length}</p>
            </div>
            <div className="flex flex-col justify-center h-full">
                <p className="font-bold text-xl text-slate-800">${order.amount}</p>
            </div>
            <div className="flex flex-col justify-center h-full">
                <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className="bg-[#ffe8e4] border border-tomato outline-none w-full max-w-[150px] p-2.5 rounded text-sm font-semibold text-tomato cursor-pointer">
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                </select>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
             <div className="py-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 font-medium">No orders found.</div>
        )}
      </div>
    </div>
  )
}

export default Order
