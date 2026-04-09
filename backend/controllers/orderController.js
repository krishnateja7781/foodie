import { supabase } from "../config/supabase.js";

// Placing User Order (No Payment Gateway)
const placeOrder = async (req, res) => {
    try {
        // Insert order directly
        const { data: newOrder, error } = await supabase.from('orders').insert([{
            user_id: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true, // Auto payment since skipped
            status: "Pending" // Initial status updated from generic
        }]).select().single();

        if (error) throw error;

        // Clear user cart
        await supabase.from('cart').delete().eq('user_id', req.body.userId);

        // Directly return success since we bypass payment
        res.json({ success: true, message: "Order placed successfully", orderId: newOrder.id });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const { data: orders, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        
        const mappedOrders = orders.map(o => ({...o, _id: o.id}));
        res.json({ success: true, data: mappedOrders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const { data: orders, error } = await supabase.from('orders').select('*').eq('user_id', req.body.userId).order('created_at', { ascending: false });
        if (error) throw error;
        
        const mappedOrders = orders.map(o => ({...o, _id: o.id}));
        res.json({ success: true, data: mappedOrders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Update order status
const updateStatus = async (req, res) => {
    try {
        const { error } = await supabase.from('orders').update({ status: req.body.status }).eq('id', req.body.orderId);
        if (error) throw error;
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
}

// We can keep this if frontend still calls it, though it won't be used
const verifyOrder = async (req, res) => {
    res.json({ success: true, message: "Paid" })
}

export { placeOrder, listOrders, userOrders, updateStatus ,verifyOrder }
