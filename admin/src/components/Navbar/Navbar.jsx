import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className='admin-navbar'>
      <div className="brand">
        <h1>Foodie.</h1>
        <p>Admin Panel</p>
      </div>

      <div className="navbar-right">
        <div className="navbar-badge">
          <span>🟢</span>
          <span>Live</span>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' }}>
          <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{timeString}</div>
          <div>{dateString}</div>
        </div>
        <img
          className='navbar-avatar'
          src={assets.profile_image || "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"}
          alt="Admin"
        />
      </div>
    </div>
  )
}

export default Navbar
