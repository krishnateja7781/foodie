import React, { useEffect, useState } from 'react'
import { url } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) setList(response.data.data)
      else toast.error("Error fetching list")
    } catch { toast.error("Network error") }
    finally { setLoading(false) }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
      if (response.data.success) { toast.success("Item removed"); fetchList() }
      else toast.error("Error removing item")
    } catch { toast.error("Network error") }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div>
      <div className="page-title">Food List</div>
      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)' }}>Loading...</td></tr>
            ) : list.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)' }}>No items found. Add some food items first!</td></tr>
            ) : list.map((item, index) => {
              const imageSrc = item.image?.includes('http')
                ? item.image
                : `https://occbadmrsvvfiotijgzx.supabase.co/storage/v1/object/public/food/products/${item.image}`
              return (
                <tr key={index}>
                  <td><img src={imageSrc} alt={item.name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} /></td>
                  <td style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{item.name}</td>
                  <td><span style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 600 }}>{item.category}</span></td>
                  <td style={{ fontWeight: 700, color: '#43e97b' }}>${item.price}</td>
                  <td>
                    <button onClick={() => removeFood(item._id || item.id)} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                    >Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List
