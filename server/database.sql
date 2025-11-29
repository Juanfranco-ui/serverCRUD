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
  location VARCHAR(255)
);

CREATE TABLE fields (
  field_id SERIAL PRIMARY KEY,
  complex_id INTEGER REFERENCES complexes(complex_id),
  name VARCHAR(100),
  price DECIMAL(10,2),
  sport_type VARCHAR(20) -- fútbol 5/7/11
);
