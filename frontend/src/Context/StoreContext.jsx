import React, { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import { supabase } from "../lib/supabase";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [session, setSession] = useState(null);

    // --------------- Food List ---------------
    const fetchFoodList = async () => {
        try {
            const { data: foods, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            // Map id to _id for legacy compatibility across cart/order logic
            setFoodList((foods || []).map(f => ({ ...f, _id: f.id })));
        } catch (error) {
            console.error("Error fetching food list", error);
        }
    };

    // --------------- Cart ---------------
    const addToCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (session) {
            const userId = session.user.id;
            const { data: existing } = await supabase
                .from('cart').select('*').eq('user_id', userId).eq('product_id', itemId).single();
            if (existing) {
                await supabase.from('cart').update({ quantity: existing.quantity + 1 }).eq('id', existing.id);
            } else {
                await supabase.from('cart').insert([{ user_id: userId, product_id: itemId, quantity: 1 }]);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));

        if (session) {
            const userId = session.user.id;
            const { data: existing } = await supabase
                .from('cart').select('*').eq('user_id', userId).eq('product_id', itemId).single();
            if (existing) {
                if (existing.quantity > 1) {
                    await supabase.from('cart').update({ quantity: existing.quantity - 1 }).eq('id', existing.id);
                } else {
                    await supabase.from('cart').delete().eq('id', existing.id);
                }
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(p => p._id === item || p.id === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const loadCartData = async (userId) => {
        try {
            const { data: cartRows, error } = await supabase
                .from('cart').select('*').eq('user_id', userId);
            if (error) throw error;
            const cartData = {};
            (cartRows || []).forEach(row => { cartData[row.product_id] = row.quantity; });
            setCartItems(cartData);
        } catch (error) {
            console.error("Error loading cart", error);
            setCartItems({});
        }
    };

    // --------------- Auth ---------------
    useEffect(() => {
        fetchFoodList();

        // Get existing session on mount
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            if (currentSession) {
                setSession(currentSession);
                setToken(currentSession.access_token);
                loadCartData(currentSession.user.id);
            }
        });

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                setToken(session.access_token);
                loadCartData(session.user.id);
            } else {
                setToken("");
                setCartItems({});
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        session,
        loadCartData,
        setCartItems,
        showLogin,
        setShowLogin,
        // kept for any legacy usage — same as session?.access_token
        url: null,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
