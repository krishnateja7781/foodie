import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { supabase } from '../../lib/supabase'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = () => {

    const { setToken, url, loadCartData, setShowLogin } = useContext(StoreContext)
    const [loading, setLoading] = useState(false);
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        setLoading(true);

        try {
            if (currState === "Login") {
                const { data: loginData, error } = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password
                });
                
                if (error) throw error;
                
                // Get token and setup Context
                const token = loginData.session.access_token;
                setToken(token);
                loadCartData(token);
                setShowLogin(false);
                toast.success("Successfully logged in");
            }
            else {
                // Sign up using backend to insert to profile table
                const response = await axios.post(url + "/api/user/register", data);
                if (response.data.success) {
                    setToken(response.data.token);
                    loadCartData(response.data.token);
                    setShowLogin(false);
                    toast.success("Account created successfully");
                }
                else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message || "An error occurred. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center w-full h-full'>
            <form onSubmit={onLogin} className="w-[min(90vw,330px)] bg-slate-800 text-slate-100 flex flex-col gap-6 p-6 rounded-[20px] shadow-2xl animate-fadeIn border border-white/10">
                <div className="flex justify-between items-center text-black">
                    <h2 className='text-2xl font-bold text-white'>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" className="w-4 cursor-pointer invert opacity-60 hover:opacity-100 transition" />
                </div>
                <div className="flex flex-col gap-5">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required className="outline-none border border-white/10 p-2.5 rounded-lg bg-white/5 focus:border-tomato transition-colors" /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required className="outline-none border border-white/10 p-2.5 rounded-lg bg-white/5 focus:border-tomato transition-colors" />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className="outline-none border border-white/10 p-2.5 rounded-lg bg-white/5 focus:border-tomato transition-colors" />
                </div>
                <button type='submit' disabled={loading} className="p-2.5 rounded-lg bg-tomato text-white text-[15px] cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition shadow-[0_4px_14px_0_rgba(255,107,53,0.39)]">
                    {loading ? "Loading..." : (currState === "Login" ? "Login" : "Create account")}
                </button>
                <div className="flex items-start gap-2 -mt-2">
                    <input type="checkbox" required className="mt-1 accent-tomato" />
                    <p className="text-sm text-slate-400">By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p className="text-sm text-slate-300">Create a new account? <span onClick={() => setCurrState('Sign Up')} className="text-tomato font-medium cursor-pointer hover:underline">Click here</span></p>
                    : <p className="text-sm text-slate-300">Already have an account? <span onClick={() => setCurrState('Login')} className="text-tomato font-medium cursor-pointer hover:underline">Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
