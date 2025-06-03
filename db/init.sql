CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0)
);
