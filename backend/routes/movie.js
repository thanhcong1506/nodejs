const path = require("path");
const express = require("express");

const pagination = require("../utils/paging");
const {
  getTrendingMovies,
  getTopRatingMovies,
  getGenreMovies,
  getTrailer,
  searchMovies,
} = require("../controllers/movie");
const { isAuthorized } = require("../middleware/authorized");

const router = express.Router();

router.get("/trending/:token", isAuthorized, getTrendingMovies);
router.get("/top-rate/:token", isAuthorized, getTopRatingMovies);
router.get("/discover/:token/:genreId", isAuthorized, getGenreMovies);
router.get("/discover/:token/", isAuthorized, getGenreMovies);
router.post("/video/:token", isAuthorized, getTrailer);
router.post("/search/:token", isAuthorized, searchMovies);

module.exports = router;
