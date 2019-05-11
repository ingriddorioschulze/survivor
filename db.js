const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/survivor";

const db = spicedPg(dbUrl);

exports.registerUser = function registerUser(
    first_name,
    last_name,
    city,
    country,
    email_address,
    password,
    time
) {
    const q = `INSERT INTO users (first_name, last_name, city, country, email_address, password, time) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const params = [
        first_name,
        last_name,
        city,
        country,
        email_address,
        password,
        time
    ];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

exports.getUser = function(email_address) {
    const q = `SELECT id, first_name, last_name, password
    FROM users 
    WHERE email_address = $1`;
    const params = [email_address];
    return db.query(q, params).then(result => {
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    });
};
exports.addGarden = function addGarden(
    garden_name,
    garden_location,
    garden_type,
    time
) {
    const q = `INSERT INTO garden (garden_name, garden_location, garden_type, time)
VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [garden_name, garden_location, garden_type, time];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

exports.addPlant = function addPlant(
    plant_name,
    plant_scientific_name,
    date,
    plant_picture,
    water,
    soil,
    pot,
    fertilizer,
    light,
    time
) {
    const q = `INSERT INTO plants (plant_name, plant_scientific_name, 
        date, plant_picture, water, soil, pot, fertilizer, light, time) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
    const params = [
        plant_name,
        plant_scientific_name,
        date,
        plant_picture,
        water,
        soil,
        pot,
        fertilizer,
        light,
        time
    ];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};
