DROP TABLE IF EXISTS searchPlants;

CREATE TABLE  search_plants (
    id SERIAL PRIMARY KEY,
    name TEXT,
    scientific_name TEXT,
    description TEXT,
    picture TEXT,
    light TEXT,
    water TEXT, 
    fertilizer TEXT,
    temperature TEXT,
    humidity TEXT,
    soil TEXT,
    pot_size TEXT

);