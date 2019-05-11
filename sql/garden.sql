DROP TABLE IF EXISTS garden;

CREATE TABLE  garden (
    id SERIAL PRIMARY KEY,
    garden_name VARCHAR(250) NOT NULL,
    garden_location VARCHAR(250) NOT NULL,
    garden_type VARCHAR(250) NOT NULL, 
    time TIMESTAMPTZ
);