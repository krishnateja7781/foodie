import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/',       icon: '📊', label: 'Dashboard'  },
  { path: '/add',    icon: '➕', label: 'Add Item'    },
  { path: '/list',   icon: '🍽️', label: 'Food List'  },
  { path: '/orders', icon: '📦', label: 'Orders'      },
]

const Sidebar = () => {
  return (
    <div className='admin-sidebar'>
      <div className="sidebar-section-label">Navigation</div>

      {navItems.map(({ path, icon, label }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
        >
          <span className="sidebar-icon">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}

      <div className="sidebar-section-label">System</div>
      <div className="sidebar-link" style={{ cursor: 'default', opacity: 0.5 }}>
        <span className="sidebar-icon">⚙️</span>
        <span>Settings</span>
      </div>
    </div>
  )
}

export default Sidebar
