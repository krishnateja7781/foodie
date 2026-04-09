import { supabase } from "../config/supabase.js";

// add to user cart
const addToCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body;
      
      // Check if item already in cart
      const { data: existing, error: err1 } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', itemId)
        .single();

      if (existing) {
          // Increment
          await supabase.from('cart').update({ quantity: existing.quantity + 1 }).eq('id', existing.id);
      } else {
          // Insert
          await supabase.from('cart').insert([{ user_id: userId, product_id: itemId, quantity: 1 }]);
      }

      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body;
      
      const { data: existing } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', itemId)
        .single();
        
      if (existing) {
          if (existing.quantity > 1) {
              await supabase.from('cart').update({ quantity: existing.quantity - 1 }).eq('id', existing.id);
          } else {
              await supabase.from('cart').delete().eq('id', existing.id);
          }
      }

      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// get user cart
const getCart = async (req, res) => {
   try {
      const { userId } = req.body;
      
      const { data: cartItems, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId);
        
      if (error) throw error;
      
      // Transform into object { "itemId": quantity } to match frontend expectations
      let cartData = {};
      if (cartItems) {
          cartItems.forEach(item => {
              cartData[item.product_id] = item.quantity;
          });
      }

      res.json({ success: true, cartData: cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}


export { addToCart, removeFromCart, getCart }