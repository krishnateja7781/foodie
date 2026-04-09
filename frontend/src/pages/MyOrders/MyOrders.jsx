import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

// Order Tracking Component
const OrderTracking = ({ status }) => {
    const stages = ["Pending", "Confirmed", "Preparing", "Out for delivery", "Delivered"];
    const currentIndex = stages.indexOf(status) !== -1 ? stages.indexOf(status) : 0;

    return (
        <div className="w-full mt-4 bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Order Timeline</h4>
            <div className="relative flex justify-between items-center">
                {/* Connecting Line background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
                
                {/* Connecting Line active */}
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-tomato rounded-full z-0 transition-all duration-500"
                    style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                ></div>

                {stages.map((stage, index) => {
                    const isCompleted = index <= currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div key={stage} className="relative z-10 flex flex-col items-center group">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isCompleted ? 'bg-tomato text-white shadow-lg shadow-tomato/30' : 'bg-slate-700 text-slate-400 border border-white/10'}`}>
                                {isCompleted ? '✓' : index + 1}
                            </div>
                            <span className={`absolute top-10 text-xs text-center w-20 transition-colors ${isActive ? 'text-tomato font-semibold' : 'text-slate-400'}`}>
                                {stage}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="h-12 md:h-8"></div> {/* Spacer for the absolute positioned text */}
        </div>
    );
};

const MyOrders = () => {
  const [data,setData] =  useState([]);
  const {url,token, session} = useContext(StoreContext);

  const fetchOrders = async () => {
    const accessToken = token || (session ? session.access_token : null);
    if (!accessToken) return;
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token: accessToken}});
    setData(response.data.data)
  }

  useEffect(()=>{
    fetchOrders();
  },[token, session])

  return (
    <div className='my-orders min-h-screen py-10'>
      <h2 className="text-3xl font-bold mb-8 text-white">My Orders</h2>
      <div className="flex flex-col gap-6">
        {data.length === 0 ? (
            <div className="text-slate-400 bg-white/5 p-8 rounded-2xl text-center border border-white/10">No orders found.</div>
        ) : data.map((order,index)=>{
          return (
            <div key={index} className='bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-tomato/50 transition-colors shadow-lg'>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12" />
                    
                    <div className="flex-1">
                        <p className="text-slate-200">
                            {order.items.map((item,index)=>{
                            if (index === order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                            })}
                        </p>
                    </div>

                    <div className="flex flex-col text-left md:text-right">
                        <p className="font-bold text-xl">${order.amount}.00</p>
                        <p className="text-slate-400 text-sm">Items: {order.items.length}</p>
                    </div>
                    
                    <button className="px-6 py-2 bg-tomato/10 text-tomato hover:bg-tomato hover:text-white rounded-lg font-medium transition-colors border border-tomato/30" onClick={fetchOrders}>
                        Refresh Status
                    </button>
                </div>
                
                {/* Timeline UI replaces the basic text status */}
                <OrderTracking status={order.status} />

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
