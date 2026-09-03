CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  mrp INTEGER NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  badge TEXT
);

CREATE TABLE IF NOT EXISTS product_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  color TEXT NOT NULL,
  price_adjustment INTEGER NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS emi_plans (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL,
  monthly_payment INTEGER NOT NULL,
  interest_rate NUMERIC(5,2) NOT NULL,
  cashback INTEGER NOT NULL DEFAULT 0,
  is_popular BOOLEAN NOT NULL DEFAULT FALSE,
  total_payable INTEGER NOT NULL
);

-- Funded Store demo catalog seed
-- Run after applying the Drizzle schema:
-- psql "$DATABASE_URL" -f lib/db/seed.sql

INSERT INTO products (slug, brand, name, tagline, description, mrp, price, image_url, badge)
VALUES
  (
    'iphone-17-pro',
    'Apple',
    'iPhone 17 Pro',
    'The ultimate iPhone experience',
    'A pro camera system, powerful performance, and a refined titanium design.',
    134900,
    127400,
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=90',
    'NEW'
  ),
  (
    'galaxy-s24-ultra',
    'Samsung',
    'Galaxy S24 Ultra',
    'Galaxy AI is here',
    'A brilliant display, built-in S Pen, and a camera made for the night.',
    129999,
    109999,
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=90',
    'BESTSELLER'
  ),
  (
    'pixel-9-pro',
    'Google',
    'Pixel 9 Pro',
    'The best of Google, built in',
    'Pro-level cameras and helpful AI in a beautiful, pocket-ready form.',
    109999,
    99999,
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90',
    'SMART PICK'
  )
ON CONFLICT (slug) DO UPDATE SET
  brand = EXCLUDED.brand,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  mrp = EXCLUDED.mrp,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  badge = EXCLUDED.badge;

INSERT INTO product_variants (product_id, name, value, color, price_adjustment, image_url)
SELECT p.id, v.name, v.value, v.color, v.price_adjustment, v.image_url
FROM products p
JOIN (
  VALUES
    ('iphone-17-pro', 'Finish', 'Cosmic Orange', '#E9783C', 0, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=90'),
    ('iphone-17-pro', 'Finish', 'Silver', '#DDE1E7', 0, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=90'),
    ('iphone-17-pro', 'Finish', 'Deep Blue', '#273A64', 1500, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=90'),
    ('galaxy-s24-ultra', 'Finish', 'Titanium Black', '#252525', 0, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=90'),
    ('galaxy-s24-ultra', 'Finish', 'Titanium Violet', '#6F5B7B', 0, 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=90'),
    ('galaxy-s24-ultra', 'Finish', 'Titanium Gray', '#B1B1AE', 1000, 'https://images.unsplash.com/photo-1592286927505-2fd0b6f5a8d2?auto=format&fit=crop&w=900&q=90'),
    ('pixel-9-pro', 'Storage', 'Obsidian 256GB', '#252525', 0, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90'),
    ('pixel-9-pro', 'Storage', 'Porcelain 256GB', '#EAE7E0', 0, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=90'),
    ('pixel-9-pro', 'Storage', 'Hazel 512GB', '#8D8778', 5000, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=90')
) AS v(slug, name, value, color, price_adjustment, image_url) ON v.slug = p.slug
WHERE NOT EXISTS (
  SELECT 1
  FROM product_variants existing
  WHERE existing.product_id = p.id AND existing.value = v.value
);

INSERT INTO emi_plans (product_id, tenure_months, monthly_payment, interest_rate, cashback, is_popular, total_payable)
SELECT p.id, e.tenure_months, e.monthly_payment, e.interest_rate, e.cashback, e.is_popular, e.total_payable
FROM products p
JOIN (
  VALUES
    ('iphone-17-pro', 3, 44967, 0, 7500, false, 134901),
    ('iphone-17-pro', 6, 22483, 0, 7500, false, 134898),
    ('iphone-17-pro', 12, 11242, 0, 7500, true, 134904),
    ('iphone-17-pro', 24, 5621, 0, 7500, false, 134904),
    ('iphone-17-pro', 36, 4297, 10.5, 7500, false, 154692),
    ('iphone-17-pro', 48, 3385, 10.5, 7500, false, 162480),
    ('iphone-17-pro', 60, 2842, 10.5, 7500, false, 170520),
    ('galaxy-s24-ultra', 3, 36667, 0, 5000, false, 110001),
    ('galaxy-s24-ultra', 6, 18333, 0, 5000, true, 109998),
    ('galaxy-s24-ultra', 12, 9167, 0, 5000, false, 110004),
    ('galaxy-s24-ultra', 24, 5049, 10.5, 5000, false, 121176),
    ('galaxy-s24-ultra', 36, 3636, 10.5, 5000, false, 130896),
    ('galaxy-s24-ultra', 48, 3033, 10.5, 5000, false, 145584),
    ('pixel-9-pro', 3, 33333, 0, 4000, false, 99999),
    ('pixel-9-pro', 6, 16667, 0, 4000, true, 100002),
    ('pixel-9-pro', 12, 8333, 0, 4000, false, 99996),
    ('pixel-9-pro', 24, 4582, 10.5, 4000, false, 109968),
    ('pixel-9-pro', 36, 3304, 10.5, 4000, false, 118944),
    ('pixel-9-pro', 48, 2759, 10.5, 4000, false, 132432)
) AS e(slug, tenure_months, monthly_payment, interest_rate, cashback, is_popular, total_payable) ON e.slug = p.slug
WHERE NOT EXISTS (
  SELECT 1
  FROM emi_plans existing
  WHERE existing.product_id = p.id AND existing.tenure_months = e.tenure_months
);