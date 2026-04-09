import { supabase } from "../config/supabase.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const { data: foods, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        
        // Map id to _id so frontend compatibility doesn't break instantly.
        const mappedFoods = foods.map(f => ({...f, _id: f.id}));
        res.json({ success: true, data: mappedFoods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// add food
const addFood = async (req, res) => {
    let image_filename = `${Date.now()}${req.file.originalname}`;

    try {
        const fileBuffer = req.file.buffer;
        
        // Upload to Supabase Storage
        const { error: storageError } = await supabase.storage
            .from('food')
            .upload(`products/${image_filename}`, fileBuffer, {
                contentType: req.file.mimetype
            });

        if (storageError) throw storageError;

        // Insert to DB
        const { error: dbError } = await supabase.from('products').insert([
            {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                category: req.body.category,
                image: image_filename,
            }
        ]);

        if (dbError) throw dbError;

        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log("Error adding food:", error.message);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {
        const id = req.body.id;
        
        // Get image filename
        const { data: food, error: fetchError } = await supabase.from('products').select('image').eq('id', id).single();
        if (fetchError) throw fetchError;

        if (food) {
            // Remove from storage
            await supabase.storage.from('food').remove([`products/${food.image}`]);
            
            // Memory storage removes need for fs.unlink
        }

        // Delete from database
        const { error: dbError } = await supabase.from('products').delete().eq('id', id);
        if (dbError) throw dbError;

        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listFood, addFood, removeFood }