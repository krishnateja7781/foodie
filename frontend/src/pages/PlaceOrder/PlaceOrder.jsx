import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, session, food_list, cartItems = {}, url, setCartItems, setShowLogin } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const [loading, setLoading] = useState(false);

    const placeOrder = async (e) => {
        e.preventDefault()
        // Use token or session access token depending on which is populated
        const accessToken = token || (session ? session.access_token : null);
        if (!accessToken) {
            setShowLogin(true);
            return;
        }
        setLoading(true);
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 5,
        }
        try {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token: accessToken } });
            if (response.data.success) {
                toast.success("Order Placed Successfully!");
                setCartItems({}); // Locally clear cart
                navigate("/myorders");
            }
            else {
                toast.error("Something Went Wrong")
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const accessToken = token || (session ? session.access_token : null);
        if (!accessToken) {
            setShowLogin(true);
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token, session])

    return (
        <form onSubmit={placeOrder} className='flex flex-col md:flex-row gap-12 mt-12 justify-between'>
            <div className="w-full md:w-1/2">
                <p className='text-3xl font-semibold mb-6'>Delivery Information</p>
                <div className="flex gap-4 mb-4">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required className="w-full p-3 mb-4 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required className="w-full p-3 mb-4 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                <div className="flex gap-4 mb-4">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                </div>
                <div className="flex gap-4 mb-4">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-tomato transition-colors" />
            </div>
            
            <div className="w-full md:w-1/3">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 select-none">
                    <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
                    <div>
                        <div className="flex justify-between text-slate-300 py-2"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                        <hr className="border-white/10 my-2" />
                        <div className="flex justify-between text-slate-300 py-2"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 5}</p></div>
                        <hr className="border-white/10 my-2" />
                        <div className="flex justify-between font-bold text-lg py-2"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
                    </div>
                </div>
                <button className='w-full mt-6 bg-tomato hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.23)] hover:-translate-y-1' type='submit' disabled={loading}>
                    {loading ? "Processing..." : "Proceed"}
                </button>
            </div>
        </form>
    )
}

export default PlaceOrder
