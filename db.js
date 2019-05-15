const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/survivor";

const db = spicedPg(dbUrl);

exports.registerUser = function(
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
exports.createGarden = function(name, user_id, time) {
    const q = `INSERT INTO garden (name, user_id, time)
VALUES ($1, $2, $3) RETURNING id`;
    const params = [name, user_id, time];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

exports.createPlant = function(
    user_id,
    garden_id,
    name,
    picture,
    notes,
    water_days,
    time
) {
    const q = `INSERT INTO plants (user_id, garden_id, name, picture, notes, water_days,time) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const params = [user_id, garden_id, name, picture, notes, water_days, time];
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
exports.getGarden = function(id, user_id) {
    const q = `SELECT id, name, time
    FROM garden 
    WHERE id = $1
    AND user_id = $2`;
    const params = [id, user_id];
    return db.query(q, params).then(result => {
        return result.rows[0];
    });
};

exports.getPlantsForGarden = function(garden_id) {
    const q = `SELECT id, name, picture, notes, time
    FROM plants
    WHERE garden_id = $1`;
    const params = [garden_id];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};

exports.createWatering = function(plant_id, time_due) {
    const q = `INSERT INTO waterings (plant_id, done, time_due)
    VALUES ($1, false, $2) RETURNING id`;
    const params = [plant_id, time_due];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

exports.getWaterings = function(user_id) {
    const q = `SELECT waterings.id AS id, garden.id AS garden_id, plants.name AS plant_name, garden.name AS garden_name, picture, plant_id, done, time_done, time_due
    FROM waterings
    JOIN plants ON plants.id = plant_id 
    JOIN garden ON garden.id = plants.garden_id
    WHERE plants.user_id = $1
    AND done = false 
    AND time_due <= date_trunc('day', now())`;
    const params = [user_id];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};

exports.completeWatering = function(id) {
    const q = `UPDATE waterings SET done = true, time_done = now()
    WHERE id = $1
    RETURNING (SELECT water_days FROM plants WHERE id = plant_id), plant_id, time_done`;
    const params = [id];
    return db.query(q, params).then(result => {
        return result.rows[0];
    });
};

exports.search = function(text) {
    const q = `SELECT id, name, scientific_name, description, picture, light, water, fertilizer, temperature, humidity, soil, pot_size
    FROM search_plants
    WHERE lower(name) LIKE $1
    OR lower(scientific_name) LIKE $1`;
    const params = [`%${text.toLowerCase()}%`];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};

exports.deletePlant = function(id) {
    const deleteWaterings = `DELETE FROM waterings WHERE plant_id = $1`;
    const deletePlant = `DELETE FROM plants WHERE id = $1`;
    const params = [id];
    return db.query(deleteWaterings, params).then(() => {
        return db.query(deletePlant, params);
    });
};

exports.deleteGarden = function(id) {
    const deleteGarden = `DELETE FROM garden WHERE id = $1`;
    const deleteWaterings = `DELETE FROM waterings USING plants 
    WHERE waterings.plant_id = plants.id 
    AND plants.garden_id = $1`;
    const deletePlants = `DELETE FROM plants WHERE garden_id = $1`;
    const params = [id];
    return db.query(deleteWaterings, params).then(() => {
        return db.query(deletePlants, params).then(() => {
            return db.query(deleteGarden, params);
        });
    });
};

exports.gardenBelongsToUser = function(garden_id, user_id) {
    const q = `SELECT count(id) FROM garden WHERE id = $1 AND user_id = $2`;
    const params = [garden_id, user_id];
    return db.query(q, params).then(result => {
        return result.rows[0].count > 0;
    });
};
