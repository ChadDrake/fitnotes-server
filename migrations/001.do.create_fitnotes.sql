CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(72) NOT NULL,
  user_email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  metric_name TEXT NOT NULL,
  measurement_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS progress_points(
  id UUID PRIMARY KEY,
  metric_id UUID REFERENCES metrics(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  value DECIMAL NOT NULL
);