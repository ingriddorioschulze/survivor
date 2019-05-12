DROP TABLE IF EXISTS plants;

CREATE TABLE  plants (
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL REFERENCES users(id),
    garden_id INT NOT NULL REFERENCES garden(id),
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