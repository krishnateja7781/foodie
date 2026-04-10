import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { supabaseAdmin, getImageUrl } from '../../lib/supabase'

const List = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')

  const fetchList = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setList(data || [])
    } catch (err) {
      toast.error("Error fetching food list")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async (item) => {
    if (!window.confirm(`Remove "${item.name}" from the menu?`)) return
    try {
      // Remove from Supabase Storage
      await supabaseAdmin.storage.from('food').remove([`products/${item.image}`])
      // Remove from database
      const { error } = await supabaseAdmin.from('products').delete().eq('id', item.id)
      if (error) throw error
      toast.success("Item removed")
      fetchList()
    } catch (err) {
      toast.error("Error removing item")
      console.error(err)
    }
  }

  useEffect(() => { fetchList() }, [])

  const categories = ['All', ...new Set(list.map(i => i.category))]
  const filtered = list.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'All' || item.category === filterCat
    return matchSearch && matchCat
  })

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div className="page-title" style={{ marginBottom: 0 }}>
          Food List
          <span style={{ marginLeft: 12, fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.3)' }}>
            {filtered.length} items
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            className="admin-input"
            placeholder="🔍  Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 220 }}
          />
          <select className="admin-input" value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ minWidth: 140 }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={fetchList} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', padding: '10px 18px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>↻ Refresh</button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <div style={{ width: 44, height: 44, border: '3px solid rgba(255,107,53,0.2)', borderTop: '3px solid #FF6B35', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass" style={{ padding: 64, textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{list.length === 0 ? 'No items yet. Add some food to the menu!' : 'No items match your search.'}</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {filtered.map((item) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 20,
              overflow: 'hidden',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'default',
              position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onError={e => { e.target.style.display = 'none' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#FF6B35', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, border: '1px solid rgba(255,107,53,0.3)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  {item.category}
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'linear-gradient(135deg, #FF6B35, #ff4500)', color: 'white', fontSize: 15, fontWeight: 800, padding: '4px 14px', borderRadius: 50, boxShadow: '0 4px 12px rgba(255,107,53,0.4)' }}>
                  ${item.price}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '18px 20px 20px' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: 8, lineHeight: 1.3 }}>{item.name}</h3>
                {item.description && (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 16 }}>
                    {item.description}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#43e97b', boxShadow: '0 0 6px #43e97b' }}></div>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Available</span>
                  </div>
                  <button
                    onClick={() => removeFood(item)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)' }}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default List
