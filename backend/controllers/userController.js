import { supabase } from "../config/supabase.js";

//create token - Not entirely needed since Supabase provides JWTs, 
//but we will use Anon client to generate one for compatibility.
import { createClient } from '@supabase/supabase-js';
const supabaseAnon = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const { data, error } = await supabaseAnon.auth.signInWithPassword({
            email,
            password
        });

        if(error || !data.user){
            return res.json({success:false,message: error ? error.message : "Invalid credentials"})
        }

        res.json({success:true,token: data.session.access_token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        // 1. Create user in Supabase auth (using admin API so we don't need email verification)
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (error) {
            return res.json({success:false,message: error.message})
        }

        // 2. Insert into profiles table
        const { error: profileError } = await supabase.from('profiles').insert([
            { id: data.user.id, name, email }
        ]);

        if (profileError) {
            return res.json({success:false,message: profileError.message})
        }

        // 3. Sign in to get the JWT
        const { data: signData, error: signError } = await supabaseAnon.auth.signInWithPassword({
            email,
            password
        });

        if(signError){
             return res.json({success:false,message: signError.message})
        }

        res.json({success:true,token: signData.session.access_token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser, registerUser}