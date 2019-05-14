const axios = require("axios");

const TREFLE_TOKEN = require("./secrets.json").TREFLE_TOKEN;

function getOnePlant(id) {
    return axios
        .get(`https://trefle.io/api/plants/${id}`, {
            params: { token: TREFLE_TOKEN }
        })
        .then(({ data }) => data);
}

exports.search = term => {
    return axios
        .get("https://trefle.io/api/plants", {
            params: { page_size: 10, q: term, token: TREFLE_TOKEN }
        })
        .then(({ data }) =>
            Promise.all(
                data
                    .map(plant => getOnePlant(plant.id).catch(e => false))
                    .filter(result => result !== false)
            )
        )
        .catch(error =>
            console.error(
                "Error reading from trefle",
                error.message,
                error.response.body
            )
        );
};
