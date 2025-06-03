CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0)
);

CREATE TABLE IF NOT EXISTS cron_locks (
    name TEXT PRIMARY KEY,
    locked_by TEXT NOT NULL,
    locked_at TIMESTAMP NOT NULL
);

CREATE TABLE cron_history (
    id SERIAL PRIMARY KEY,
    task TEXT,
    server TEXT,
    started_at TIMESTAMP,
    finished_at TIMESTAMP
);

