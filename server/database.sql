CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) -- 'owner' o 'player'
);

CREATE TABLE complexes (
  complex_id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(user_id),
  name VARCHAR(100),
  address VARCHAR(255),
  coordinates VARCHAR(100),
  phone VARCHAR(50),
  status VARCHAR(20), -- 'active', 'inactive', etc.
  mercado_pago BOOLEAN DEFAULT FALSE,
  beelup BOOLEAN DEFAULT FALSE,
  hours JSONB, -- Stores opening/closing times for each day
  services TEXT[], -- Array of strings for services
  logo_url VARCHAR(255),
  cover_url VARCHAR(255)
);

CREATE TABLE fields (
  field_id SERIAL PRIMARY KEY,
  complex_id INTEGER REFERENCES complexes(complex_id),
  name VARCHAR(100),
  sports TEXT[],
  football_types TEXT[],
  start_rounding VARCHAR(50),
  floor_type VARCHAR(50),
  attributes TEXT[]
);
