ALTER TABLE IF EXISTS metrics
ADD user_id TEXT REFERENCES users(id) NOT NULL;