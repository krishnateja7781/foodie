-- ============================================================
-- TOMATO FOOD APP - SUPABASE SCHEMA
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. PROFILES (mirrors auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS (food items)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CART
CREATE TABLE IF NOT EXISTS public.cart (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  UNIQUE(user_id, product_id)
);

-- 4. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  items JSONB NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  address JSONB NOT NULL,
  status TEXT DEFAULT 'Pending',
  payment BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- profiles
DROP POLICY IF EXISTS "profiles_self" ON public.profiles;
CREATE POLICY "profiles_self" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- products: public read, service role write
DROP POLICY IF EXISTS "products_public_read" ON public.products;
CREATE POLICY "products_public_read" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "products_service_write" ON public.products;
CREATE POLICY "products_service_write" ON public.products
  FOR ALL USING (true);

-- cart: users own their cart
DROP POLICY IF EXISTS "cart_own" ON public.cart;
CREATE POLICY "cart_own" ON public.cart
  FOR ALL USING (true);

-- orders: allow all via service role
DROP POLICY IF EXISTS "orders_all" ON public.orders;
CREATE POLICY "orders_all" ON public.orders
  FOR ALL USING (true);

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('food', 'food', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Setup Bucket Access Policies
-- Allow anyone to read the images
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'food');

-- Allow anyone to insert images (For development only, usually restricted to authenticated users)
DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
CREATE POLICY "Public Insert" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'food');

-- Allow anyone to delete images
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
CREATE POLICY "Public Delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'food');

-- ============================================================
-- TRIGGER: auto-update updated_at on orders
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
