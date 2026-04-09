import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const MobileApp = () => {
    const { food_list, menu_list } = useContext(StoreContext);

    // Safe image URL helper
    const getImageUrl = (image) => {
        if (!image) return '';
        return image.includes('http') ? image : `https://occbadmrsvvfiotijgzx.supabase.co/storage/v1/object/public/food/products/${image}`;
    }

    const previewFoods = food_list.slice(0, 6);
    const heroFoods = food_list.slice(0, 2);

    return (
        <div className='mobile-app-page'>
            <div className="mobile-app-hero">
                <h1>The Future of Food <br /><span>In Your Pocket</span></h1>
                <p>We are building a revolution in food delivery. Experience the fastest, most reliable way to get your favorite meals delivered right to your doorstep.</p>
            </div>

            <div className='mobile-app-download'>
                <div className="coming-soon-badge">Coming Soon</div>
                <h2>Experience Foodie on Mobile</h2>

                <div className="app-mockups">
                    {/* Left: Menu Page */}
                    <div className="phone-frame">
                        <div className="phone-screen">
                            <div className="mock-header">Menu &amp; Categories</div>
                            <div className="mock-content" style={{ padding: '10px' }}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                    {menu_list.slice(0, 4).map((cat, i) => (
                                        <div key={i} style={{ width: '35px', height: '35px', borderRadius: '50%', background: `url(${cat.menu_image})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid #FF4C24' }}></div>
                                    ))}
                                </div>
                                {previewFoods.length > 0 ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {previewFoods.map((food, i) => (
                                            <div key={i} style={{ background: 'white', padding: '5px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                                                <div style={{ height: '50px', background: `url(${getImageUrl(food.image)})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '5px', marginBottom: '4px' }}></div>
                                                <p style={{ fontSize: '7px', fontWeight: '600', color: '#262626', marginBottom: '2px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{food.name}</p>
                                                <p style={{ fontSize: '7px', color: '#FF4C24', fontWeight: '700' }}>${food.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', fontSize: '8px', color: '#aaa', padding: '20px 0' }}>Add items from the admin panel to see them here!</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Center: Home Page */}
                    <div className="phone-frame">
                        <div className="phone-screen">
                            <div className="mock-header">Foodie Home</div>
                            <div className="mock-content">
                                <div className="mock-promo" style={{ background: 'linear-gradient(135deg, #FF4C24, #ff8c42)', height: '100px', fontSize: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px' }}>
                                    Craving Something Fresh? <br />
                                    <span style={{ fontSize: '18px', fontWeight: '800' }}>GET 50% OFF</span>
                                </div>
                                <div className="mock-categories">
                                    {menu_list.slice(0, 5).map((cat, i) => (
                                        <div key={i} className="mock-cat-item" style={{ backgroundImage: `url(${cat.menu_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                                    {menu_list.slice(0, 5).map((cat, i) => (
                                        <span key={i} style={{ fontSize: '6px', color: '#555', textAlign: 'center', width: '35px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{cat.menu_name}</span>
                                    ))}
                                </div>
                                <h4 style={{ fontSize: '12px', marginBottom: '10px' }}>Recommended</h4>
                                {heroFoods.length > 0 ? heroFoods.map((food, i) => (
                                    <div key={i} className="mock-food-card">
                                        <div className="mock-food-img" style={{ background: `url(${getImageUrl(food.image)})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '70px' }}></div>
                                        <div style={{ padding: '6px 8px' }}>
                                            <p style={{ fontSize: '9px', fontWeight: '600', color: '#262626', marginBottom: '4px' }}>{food.name}</p>
                                            <p style={{ fontSize: '8px', color: '#FF4C24', fontWeight: '700' }}>${food.price}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', fontSize: '8px', color: '#aaa', padding: '10px' }}>No items yet</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Track Order */}
                    <div className="phone-frame">
                        <div className="phone-screen">
                            <div className="mock-header">Track Order</div>
                            <div className="mock-content" style={{ padding: '0' }}>
                                <div className="mock-map" style={{ background: '#e8f0e8' }}>
                                    <svg width="100%" height="100%" viewBox="0 0 204 310" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
                                        <rect width="204" height="310" fill="#e8efe8" />
                                        <path d="M0,160 Q40,148 80,155 Q120,162 160,150 Q180,145 204,152" fill="none" stroke="#a8d5f5" strokeWidth="12" opacity="0.7" />
                                        <rect x="0" y="58" width="204" height="5" fill="#ffffff" stroke="#ccc" strokeWidth="0.5" />
                                        <rect x="0" y="112" width="204" height="4" fill="#ffffff" stroke="#ccc" strokeWidth="0.5" />
                                        <rect x="0" y="170" width="204" height="4" fill="#ffffff" stroke="#ccc" strokeWidth="0.5" />
                                        <rect x="50" y="0" width="4" height="310" fill="#fff" stroke="#ccc" strokeWidth="0.5" />
                                        <rect x="100" y="0" width="5" height="310" fill="#fff" stroke="#ccc" strokeWidth="0.5" />
                                        <rect x="150" y="0" width="4" height="310" fill="#fff" stroke="#ccc" strokeWidth="0.5" />
                                        <path d="M165,42 L165,58 L150,58 L150,112 L102,112 L102,130 Q102,145 90,148 Q78,151 80,155 Q82,158 102,160 L102,170 L75,170 L75,225 L60,225 L60,260" fill="none" stroke="#FF4C24" strokeWidth="3" strokeDasharray="6,4" strokeLinecap="round" />
                                        <circle cx="165" cy="38" r="6" fill="#FF4C24" />
                                        <circle cx="165" cy="38" r="3" fill="white" />
                                        <path d="M55,268 L60,260 L65,268 Z" fill="#2ecc71" />
                                        <circle cx="60" cy="256" r="7" fill="#2ecc71" />
                                        <circle cx="60" cy="256" r="3" fill="white" />
                                        <text x="88" y="108" fontSize="14" textAnchor="middle">🛵</text>
                                    </svg>
                                    <div className="mock-tracking-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <b style={{ fontSize: '12px' }}>Courier is Arriving</b>
                                            <span style={{ color: '#FF4C24', fontSize: '10px' }}>3 mins</span>
                                        </div>
                                        <div className="mock-status-line"></div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#FF4C24', opacity: 0.3 }}></div>
                                            <div>
                                                <div className="line-1" style={{ width: '50px' }}></div>
                                                <div className="line-2" style={{ width: '80px' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <span className="feature-icon">🚀</span>
                    <h3>Lightning Fast</h3>
                    <p>Our optimized routing ensures your food arrives hot and fresh every single time.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">🛡️</span>
                    <h3>Secure Payments</h3>
                    <p>Multiple payment options with end-to-end encryption for your peace of mind.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">📍</span>
                    <h3>Live Tracking</h3>
                    <p>Watch your meal travel from the restaurant kitchen to your front door in real-time.</p>
                </div>
            </div>
        </div>
    )
}

export default MobileApp
