import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../../assets/assets'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalItems: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    recentOrders: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, foodRes] = await Promise.all([
          axios.get(`${url}/api/order/list`),
          axios.get(`${url}/api/food/list`)
        ])

        const orders = ordersRes.data.success ? ordersRes.data.data : []
        const foods  = foodRes.data.success  ? foodRes.data.data  : []

        const totalRevenue    = orders.reduce((sum, o) => sum + Number(o.amount), 0)
        const pendingOrders   = orders.filter(o => o.status === 'Pending').length
        const deliveredOrders = orders.filter(o => o.status === 'Delivered').length
        const recentOrders    = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          totalItems: foods.length,
          pendingOrders,
          deliveredOrders,
          recentOrders
        })
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statusClass = (s) => {
    const map = { Pending: 'pending', Confirmed: 'confirmed', Preparing: 'preparing', 'Out for delivery': 'delivering', Delivered: 'delivered' }
    return map[s] || 'pending'
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, border: '3px solid rgba(255,107,53,0.2)', borderTop: '3px solid #FF6B35', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading dashboard...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <div>
      <div className="page-title">Dashboard Overview</div>

      {/* ── Stats Grid ── */}
      <div className="stats-grid">
        <div className="stat-card orange">
          <span className="stat-icon">💰</span>
          <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-trend up">↑ All time earnings</div>
        </div>

        <div className="stat-card blue">
          <span className="stat-icon">📦</span>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-trend up">↑ Orders placed</div>
        </div>

        <div className="stat-card green">
          <span className="stat-icon">🍽️</span>
          <div className="stat-value">{stats.totalItems}</div>
          <div className="stat-label">Menu Items</div>
          <div className="stat-trend neutral">Active food items</div>
        </div>

        <div className="stat-card purple">
          <span className="stat-icon">⏳</span>
          <div className="stat-value">{stats.pendingOrders}</div>
          <div className="stat-label">Pending Orders</div>
          <div className="stat-trend neutral">Awaiting action</div>
        </div>
      </div>

      {/* ── Second row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
        {/* Delivered count */}
        <div className="glass" style={{ padding: 24 }}>
          <div className="section-heading">Order Status Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Delivered', count: stats.deliveredOrders, color: '#43e97b', pct: stats.totalOrders ? Math.round(stats.deliveredOrders/stats.totalOrders*100) : 0 },
              { label: 'Pending', count: stats.pendingOrders, color: '#fbbf24', pct: stats.totalOrders ? Math.round(stats.pendingOrders/stats.totalOrders*100) : 0 },
              { label: 'In Progress', count: stats.totalOrders - stats.deliveredOrders - stats.pendingOrders, color: '#4facfe', pct: stats.totalOrders ? Math.round((stats.totalOrders - stats.deliveredOrders - stats.pendingOrders)/stats.totalOrders*100) : 0 },
            ].map(({ label, count, color, pct }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                  <span style={{ color, fontWeight: 700 }}>{count} ({pct}%)</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 1s ease' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="glass" style={{ padding: 24 }}>
          <div className="section-heading">Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '➕', label: 'Add New Food Item',   path: '/add',    color: '#FF6B35' },
              { icon: '📋', label: 'View Full Food List',  path: '/list',   color: '#4facfe' },
              { icon: '📦', label: 'Manage All Orders',    path: '/orders', color: '#43e97b' },
            ].map(({ icon, label, path, color }) => (
              <a key={path} href={`#${path}`} onClick={(e) => { e.preventDefault(); window.location.hash = path; }} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500 }}>{label}</span>
                <span style={{ marginLeft: 'auto', color, fontSize: 18 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Orders Table ── */}
      <div className="section-heading">Recent Orders</div>
      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)' }}>No orders yet. Add some food items and place an order!</td></tr>
            ) : (
              stats.recentOrders.map((order, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>#{String(order._id || order.id).slice(-6).toUpperCase()}</td>
                  <td style={{ fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{order.address?.firstName || '—'} {order.address?.lastName || ''}</td>
                  <td>{order.items?.length || 0} items</td>
                  <td style={{ fontWeight: 700, color: '#FF6B35' }}>${order.amount}</td>
                  <td><span className={`status-badge ${statusClass(order.status)}`}>• {order.status}</span></td>
                  <td style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB') : '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
