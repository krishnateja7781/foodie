import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Dashboard from './pages/Dashboard/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL;

  if (!isSupabaseConfigured) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0c29', color: 'white', padding: 20 }}>
        <div className="glass" style={{ maxWidth: 600, padding: 40, textAlign: 'center' }}>
          <h2 style={{ color: '#FF6B35', fontSize: 24, marginBottom: 16 }}>⚠️ Configuration Required</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 24 }}>
            The Admin Panel cannot connect to your database. Please set the following Environment Variables in your Vercel Project Settings:
          </p>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: 20, borderRadius: 12, textAlign: 'left', marginBottom: 24 }}>
            <code style={{ display: 'block', marginBottom: 10, color: '#4facfe' }}>1. VITE_SUPABASE_URL</code>
            <code style={{ display: 'block', marginBottom: 10, color: '#4facfe' }}>2. VITE_SUPABASE_ANON_KEY</code>
            <code style={{ display: 'block', color: '#ff9a6c' }}>3. VITE_SUPABASE_SERVICE_KEY (Required for Admin)</code>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            After adding these variables, go to Deployments and trigger a Redeploy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <ToastContainer theme="dark" position="top-right" />
      <Navbar />
      <div className="admin-main">
        <Routes>
          <Route path="/"       element={<Dashboard />} />
          <Route path="/add"    element={<Add />} />
          <Route path="/list"   element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}


export default App
