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
exports.createGarden = function addGarden(name, user_id, time) {
    const q = `INSERT INTO garden (name, user_id, time)
VALUES ($1, $2, $3) RETURNING id`;
    const params = [name, user_id, time];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

exports.addPlant = function addPlant(
    users_id,
    garden_id,
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
    const q = `INSERT INTO plants (users_id, garden_id, plant_name, plant_scientific_name, 
        date, plant_picture, water, soil, pot, fertilizer, light, time) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`;
    const params = [
        users_id,
        garden_id,
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

//all the gardens//
exports.getGardens = function(user_id) {
    const q = `SELECT id, name, time
    FROM garden
    WHERE user_id = $1`;
    const params = [user_id];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};

//one garden//
exports.getGarden = function(id) {
    const q = `SELECT garden_name, garden_location, garden_type, time
    FROM garden 
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params).then(result => {
        return result.rows[0];
    });
};

exports.getPlantsForGarden = function(garden_id) {
    const q = `SELECT plant_name, plant_scientific_name, 
    date, plant_picture, water, soil, pot, fertilizer, light, time
    FROM plants
    WHERE garden_id = $1`;
    const params = [garden_id];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};
