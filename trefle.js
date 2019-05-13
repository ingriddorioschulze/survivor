import axios from "./axios";

const TREFLE_TOKEN = require("./secrets.json").TREFLE_TOKEN;

exports.search = term => {
    return axios
        .get("https://trefle.io/api/plants", {
            params: { q: term, token: TREFLE_TOKEN }
        })
        .then(({ data }) => data)
        .catch(error => console.error("Error reading from trefle", error));
};
