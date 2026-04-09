import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

const Navbar = () => {

  const { getTotalCartAmount, token, setToken, session, setShowLogin, food_list, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    // Supabase
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate('/')
  }

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSearch = food_list.filter(item =>
    searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/menu?search=${searchQuery.trim()}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  }

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return "text-tomato border-b-2 border-tomato pb-1";
    if (path === '/menu' && location.pathname.startsWith('/menu')) return "text-tomato border-b-2 border-tomato pb-1";
    if (path === '/mobile-app' && location.pathname === '/mobile-app') return "text-tomato border-b-2 border-tomato pb-1";
    if (path === '/contact-us' && location.pathname === '/contact-us') return "text-tomato border-b-2 border-tomato pb-1";
    return "text-[#a0a4b0] hover:text-white pb-1 border-b-2 border-transparent transition-colors";
  }

  // Use session or token
  const isLoggedIn = session || token;

  return (
    <div className='py-5 flex justify-between items-center z-40 sticky top-0 bg-[#1A1A2E]/80 backdrop-blur-md mb-8'>
      <Link to='/'><h1 className="text-tomato font-extrabold text-4xl tracking-tighter">Foodie.</h1></Link>
      <ul className="hidden md:flex gap-5 text-lg font-medium cursor-pointer">
        <Link to="/" className={isActive('/')}>home</Link>
        <Link to="/menu" className={isActive('/menu')}>menu</Link>
        <Link to="/mobile-app" className={isActive('/mobile-app')}>mobile app</Link>
        <Link to="/contact-us" className={isActive('/contact-us')}>contact us</Link>
      </ul>
      <div className="flex items-center gap-[20px] md:gap-[40px]">
        <div className={`relative ${showSearch ? "w-64" : "w-10"} transition-all duration-300 flex items-center justify-end`}>
          <input
            type="text"
            placeholder="Search food..."
            className={`absolute right-10 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full outline-none transition-all duration-300 ${showSearch ? 'opacity-100 w-52 pointer-events-auto' : 'opacity-0 w-0 pointer-events-none'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img src={assets.search_icon} className="w-6 cursor-pointer invert opacity-80 hover:opacity-100 transition z-10" onClick={() => setShowSearch(!showSearch)} alt="" />

          {searchQuery && (
            <div className="absolute top-12 right-0 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn p-2 backdrop-blur-xl bg-opacity-90">
              {filteredSearch.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-white/10 cursor-pointer rounded-lg transition" onClick={() => {
                  navigate(`/menu?search=${item.name}`);
                  setSearchQuery("");
                  setShowSearch(false);
                }}>
                  <img src={item.image.includes('http') ? item.image : `https://occbadmrsvvfiotijgzx.supabase.co/storage/v1/object/public/food/products/${item.image}`} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <p className="text-sm font-medium text-slate-200">{item.name}</p>
                </div>
              ))}
              {filteredSearch.length === 0 && (
                <div className="p-3 text-center text-slate-400 text-sm">No dishes found</div>
              )}
            </div>
          )}
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.basket_icon} className="w-7 invert opacity-80 hover:opacity-100 transition" alt="" />
          <div className={getTotalCartAmount() > 0 ? "absolute min-w-[10px] min-h-[10px] bg-tomato rounded-full -top-2 -right-2 ring-2 ring-[#1A1A2E]" : ""}></div>
        </Link>
        {!isLoggedIn ? <button onClick={() => setShowLogin(true)} className="bg-transparent text-white border border-tomato/50 hover:bg-tomato/10 px-6 py-2 rounded-full cursor-pointer transition">sign in</button>
          : <div className='relative group'>
            <img src={assets.profile_icon} className="w-7 cursor-pointer opacity-80 invert hover:opacity-100 transition" alt="" />
            <ul className='absolute right-0 top-10 w-40 bg-slate-800 border border-slate-700/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col gap-2 pt-3 pb-3 px-0 overflow-hidden backdrop-blur-sm z-50'>
              <li onClick={() => navigate('/myorders')} className="flex items-center gap-3 cursor-pointer hover:text-tomato hover:bg-white/5 py-2 px-4 transition-colors"> <img className="w-5" src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr className="border-slate-700 mx-4 my-1" />
              <li onClick={logout} className="flex items-center gap-3 cursor-pointer hover:text-tomato hover:bg-white/5 py-2 px-4 transition-colors"> <img className="w-5" src={assets.logout_icon} alt="" /> <p>Logout</p></li>
            </ul>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
