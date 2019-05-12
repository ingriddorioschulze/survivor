DROP TABLE IF EXISTS plants;

CREATE TABLE  plants (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    garden_id INT NOT NULL REFERENCES garden(id),
    name VARCHAR(250) NOT NULL,
    picture TEXT,
    notes TEXT,
    time TIMESTAMPTZ
);