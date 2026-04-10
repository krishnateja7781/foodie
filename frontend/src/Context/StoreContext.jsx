import React, { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import { supabase } from "../lib/supabase"; // Use Supabase client
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("") // Keeping token logic in parallel if needed, though session is better
    const [showLogin, setShowLogin] = useState(false);
    
    // Auth session
    const [session, setSession] = useState(null);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (session) {
            // Using backend so standard flow is maintained or we could use supabase.from directly in frontend
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token: session.access_token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (session) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token: session.access_token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item || product.id === item);
                if (itemInfo) {
                     totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list", error);
        }
    }

    const loadCartData = async (accessToken) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: {token: accessToken} });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data", error);
            setCartItems({});
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            // Get current session from Supabase (handles token persistence internally)
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            if (currentSession) {
                setSession(currentSession);
                setToken(currentSession.access_token);
                await loadCartData(currentSession.access_token);
            }
        }
        loadData();

        // Subscribe to auth state changes, and clean up on unmount
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                setToken(session.access_token);
                loadCartData(session.access_token);
            } else {
                setToken("");
                setCartItems({});
            }
        });

        return () => subscription.unsubscribe();
    }, [])


    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,  // For legacy compatibility
        setToken,
        session, // Expose session
        loadCartData,
        setCartItems,
        showLogin,
        setShowLogin
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
