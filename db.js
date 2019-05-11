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
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
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
