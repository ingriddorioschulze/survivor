DROP TABLE IF EXISTS users;

CREATE TABLE  users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    city VARCHAR(250) NOT NULL,
    country VARCHAR(250) NOT NULL,
    email_address VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    users_image TEXT,
    time TIMESTAMPTZ
);