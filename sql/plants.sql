DROP TABLE IF EXISTS plants;

CREATE TABLE  plants (
    id SERIAL PRIMARY KEY,
    plant_name VARCHAR(250) NOT NULL,
    plant_scientific_name VARCHAR(250),
    date VARCHAR(250) NOT NULL,
    plant_picture TEXT,
    water VARCHAR(250) NOT NULL,
    soil VARCHAR(250),
    pot VARCHAR(250),
    fertilizer VARCHAR(250),
    light VARCHAR(250),
    time TIMESTAMPTZ
);