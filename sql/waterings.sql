DROP TABLE IF EXISTS waterings;

CREATE TABLE  waterings (
    id SERIAL PRIMARY KEY,
    plant_id INT NOT NULL REFERENCES plants (id),
    done BOOLEAN NOT NULL,
    time_done TIMESTAMPTZ,
    time_due TIMESTAMPTZ NOT NULL
);