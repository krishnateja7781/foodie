import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/',       label: 'Dashboard' },
  { path: '/add',    label: 'Add Item'  },
  { path: '/list',   label: 'Food List' },
  { path: '/orders', label: 'Orders'    },
]

const Navbar = () => {
  const now = new Date()
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className='admin-navbar'>
      {/* Brand */}
      <div className="brand">
        <h1>Foodie.</h1>
        <p>Admin Panel</p>
      </div>

      {/* Horizontal Nav Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            style={({ isActive }) => ({
              padding: '8px 18px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              background: isActive ? 'rgba(255,107,53,0.18)' : 'transparent',
              color: isActive ? '#FF6B35' : 'rgba(255,255,255,0.5)',
              border: isActive ? '1px solid rgba(255,107,53,0.3)' : '1px solid transparent',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right Side */}
      <div className="navbar-right">
        <div className="navbar-badge">
          <span>🟢</span>
          <span>Live · {timeString}</span>
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
