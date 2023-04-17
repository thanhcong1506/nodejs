const {
  trendingPaging,
  topRatePaging,
  genresPaging,
  searchPaging,
} = require("../utils/paging");
const Movie = require("../models/Movie");
const Video = require("../models/Video");
const GenreList = require("../data/genreList.json");
const VideoList = require("../data/videoList.json");

// get trending movies
exports.getTrendingMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = trendingPaging(movies, page, limit);
    res.status(200).send(results);
  });
};

// get top rate movies
exports.getTopRatingMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const genreId = +req.params.genreId;
    console.log("geneeId :", genreId);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = topRatePaging(movies, page, limit, genreId);
    res.status(200).send(results);
  });
};

// get movies based on genreId, send error msg if no genreId found in the list
exports.getGenreMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const genreId = +req.params.genreId;
    if (!genreId) {
      res.status(400).send({ message: "Not found gerne parram" });
      return;
    }
    if (genreId) {
      const isAvailable = GenreList.find((genre) => genre.id === genreId);
      if (!isAvailable) {
        res.status(400).send({ message: "Not found that genre id" });
        return;
      } else {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 20;
        const results = genresPaging(movies, page, limit, genreId);
        res.status(200).send(results);
      }
    }
  });
};

exports.getTrailer = (req, res, next) => {
  Video.fetchAll((video) => {
    const filmId = req.body.query;
    console.log(filmId);

    if (!filmId) {
      res.status(400).send({ message: "Not found filmId params" });
      return;
    } else {
      const found = video.filter((video) => video.id === filmId)[0];
      if (!found) {
        res.status(400).send({ message: "Not found video" });

        return;
      } else {
        const isSuitable = found.videos.filter((vid) => {
          if (vid.official && vid.site === "YouTube") {
            if (vid.type === "Trailer") {
              return vid;
            } else {
              if (vid.type === "Teaser") {
                return vid;
              }
            }
          }
        });
        if (isSuitable !== []) {
          const latestPublishedDate = new Date(
            Math.max(...isSuitable.map((e) => new Date(e.published_at)))
          ).toISOString();
          const latestTrailer = isSuitable.filter(
            (s) => s.published_at === latestPublishedDate
          );
          console.log(latestTrailer);
          res.statusCode = 200;
          res.send(latestTrailer);
        } else {
          res.status(400).send({ message: "Not found video" });
          return;
        }
      }
    }
  });
};

// Search movies
exports.searchMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const query = req.body.query;
    if (!query || query === "") {
      res.status(400).send({ message: "Not found keyword parram" });
      return;
    } else {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = 20;
      const results = searchPaging(movies, page, limit, query);
      res.status(200).send(results);
    }
  });
};
