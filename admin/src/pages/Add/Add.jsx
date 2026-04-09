import React, { useState } from 'react'
import { assets, url } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
  const [data, setData] = useState({ name: "", description: "", price: "", category: "Salad" })
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    try {
      const response = await axios.post(`${url}/api/food/add`, formData)
      if (response.data.success) {
        toast.success(response.data.message)
        setData({ name: "", description: "", price: "", category: "Salad" })
        setImage(false)
      } else {
        toast.error(response.data.message)
      }
    } catch {
      toast.error("Failed to add item. Check if backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const onChangeHandler = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <div>
      <div className="page-title">Add Food Item</div>
      <div className="glass" style={{ maxWidth: 640, padding: 36 }}>
        <form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Image Upload */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>Product Image</p>
            <label htmlFor="image" style={{ cursor: 'pointer', display: 'inline-block' }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 16, border: '2px solid rgba(255,107,53,0.4)' }} />
              ) : (
                <div style={{ width: 120, height: 120, borderRadius: 16, border: '2px dashed rgba(255,255,255,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', transition: 'border 0.2s' }}>
                  <span style={{ fontSize: 28 }}>📷</span>
                  <span style={{ fontSize: 11 }}>Upload</span>
                </div>
              )}
            </label>
            <input onChange={e => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden required />
          </div>

          {/* Name */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Product Name</p>
            <input className="admin-input" name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder="e.g. Margherita Pizza" required style={{ width: '100%' }} />
          </div>

          {/* Description */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Description</p>
            <textarea className="admin-input" name="description" value={data.description} onChange={onChangeHandler} rows={3} placeholder="Describe this dish..." required style={{ width: '100%', resize: 'vertical' }} />
          </div>

          {/* Category + Price */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Category</p>
              <select className="admin-input" name="category" value={data.category} onChange={onChangeHandler} style={{ width: '100%' }}>
                {["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Price ($)</p>
              <input className="admin-input" type="number" name="price" value={data.price} onChange={onChangeHandler} placeholder="0.00" min="0" required style={{ width: '100%' }} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="admin-btn" style={{ alignSelf: 'flex-start', minWidth: 160 }}>
            {loading ? 'Adding...' : '+ Add Item'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
