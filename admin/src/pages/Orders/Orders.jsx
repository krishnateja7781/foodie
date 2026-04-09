import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets, url } from '../../assets/assets'

const statusOptions = ["Pending", "Confirmed", "Preparing", "Out for delivery", "Delivered"]
const statusClass = (s) => {
  const map = { Pending: 'pending', Confirmed: 'confirmed', Preparing: 'preparing', 'Out for delivery': 'delivering', Delivered: 'delivered' }
  return map[s] || 'pending'
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) setOrders(response.data.data)
      else toast.error("Error fetching orders")
    } catch { toast.error("Network error") }
    finally { setLoading(false) }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status: e.target.value })
      if (response.data.success) { toast.success("Status updated"); fetchAllOrders() }
    } catch { toast.error("Failed to update status") }
  }

  useEffect(() => { fetchAllOrders() }, [])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div className="page-title" style={{ marginBottom: 0 }}>Order Management</div>
        <button onClick={fetchAllOrders} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '8px 18px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>↻ Refresh</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading ? (
          <div className="glass" style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="glass" style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>No orders placed yet.</div>
        ) : orders.map((order, index) => (
          <div key={index} className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto auto auto', gap: 20, alignItems: 'center' }}>
              
              {/* Icon */}
              <div style={{ width: 40, height: 40, background: 'rgba(255,107,53,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📦</div>

              {/* Details */}
              <div>
                <p style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4, fontSize: 14 }}>
                  {order.items?.map((item, i) => item.name + ' x' + item.quantity + (i < order.items.length - 1 ? ', ' : '')).join('')}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600 }}>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
                  {order.address?.city}, {order.address?.country} — 📞 {order.address?.phone}
                </p>
              </div>

              {/* Items count */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#4facfe' }}>{order.items?.length}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>items</div>
              </div>

              {/* Amount */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#FF6B35' }}>${order.amount}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>total</div>
              </div>

              {/* Status select */}
              <div>
                <select
                  onChange={(e) => statusHandler(e, order._id || order.id)}
                  value={order.status}
                  className="admin-input"
                  style={{ minWidth: 160 }}
                >
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div style={{ marginTop: 6, textAlign: 'center' }}>
                  <span className={`status-badge ${statusClass(order.status)}`}>• {order.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
