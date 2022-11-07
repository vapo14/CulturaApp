const axios = require("axios");

const IMDB_API_KEY = process.env.IMDB_API_KEY;
const baseURL = `https://imdb-api.com/en/API/SearchMovie/${IMDB_API_KEY}/`;

const searchMovie = async (req, res) => {
  try {
    let data = await axios.get(baseURL + req.query.q);
    if (data.data.errorMessage !== "") {
      return res.json({
        status: "FAILED",
        message: `Search failed. IMDB error message: ${data.data.errorMessage}`,
      });
    }
    return res.send(data.data.results);
  } catch (error) {
    return res
      .status(500)
      .json({ status: "FAILED", message: "Search failed. Try again." });
  }
};

module.exports = { searchMovie };
