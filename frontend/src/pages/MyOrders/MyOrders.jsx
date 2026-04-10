import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { supabase } from '../../lib/supabase';

const MyOrders = () => {

    const { session, token } = useContext(StoreContext); // token kept for dependency array, though session is key
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (!session) return;
        setLoading(true);
        try {
            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setData(orders || []);
        } catch (error) {
            console.error("Error fetching user orders:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session) {
            fetchOrders();
        } else {
            setData([]);
            setLoading(false);
        }
    }, [session]) // Reacting to session login/logout

    if (loading) return (
        <div className="flex justify-center items-center py-20 min-h-[50vh]">
            <div className="w-12 h-12 border-[3px] border-tomato/20 border-t-tomato rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className='my-12 flex flex-col gap-8 min-h-[50vh]'>
            <div>
                <h2 className="text-[28px] font-bold text-white mb-2">My Orders</h2>
                <p className="text-slate-400 text-sm">Track the status of your recent food deliveries</p>
            </div>

            {data.length === 0 ? (
                <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 p-12 text-center text-slate-400">
                    <div className="text-4xl mb-4">🍽️</div>
                    <p className="font-semibold text-lg text-slate-300">No orders yet</p>
                    <p className="mt-1">Looks like you haven't placed any orders yet. Check out our menu!</p>
                </div>
            ) : (
                <div className='flex flex-col gap-5'>
                    {data.map((order, index) => {
                        return (
                            <div key={index} className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-6 text-sm text-slate-300 bg-slate-800/40 backdrop-blur-md border border-white/10 px-6 py-5 rounded-2xl transition-all hover:bg-slate-800/60 hover:shadow-lg hover:-translate-y-0.5'>
                                <div className="w-12 h-12 bg-tomato/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    📦
                                </div>
                                <p className="font-medium text-slate-200 leading-relaxed">
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                                <p className="font-bold text-tomato text-lg">${order.amount}.00</p>
                                <p className="font-medium text-slate-400">Items: {order.items.length}</p>
                                
                                <p className='flex items-center gap-2 font-semibold text-[13px]'>
                                    {order.status === 'Pending' && <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_theme(colors.amber.400)]"></span>}
                                    {order.status === 'Confirmed' && <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_theme(colors.blue.400)]"></span>}
                                    {order.status === 'Preparing' && <span className="w-2 h-2 rounded-full bg-tomato shadow-[0_0_8px_theme(colors.tomato)]"></span>}
                                    {order.status === 'Out for delivery' && <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_theme(colors.purple.400)]"></span>}
                                    {order.status === 'Delivered' && <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_theme(colors.green.400)]"></span>}
                                    
                                    <span className={
                                        order.status === 'Pending' ? 'text-amber-400' :
                                        order.status === 'Confirmed' ? 'text-blue-400' :
                                        order.status === 'Preparing' ? 'text-tomato' :
                                        order.status === 'Out for delivery' ? 'text-purple-400' :
                                        'text-green-400'
                                    }>
                                        {/* Original status had html entity, keeping raw text for clarity */}
                                        {order.status}
                                    </span>
                                </p>
                                <button onClick={fetchOrders} className='bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm w-full md:w-auto text-center'>
                                    Track Order
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MyOrders
