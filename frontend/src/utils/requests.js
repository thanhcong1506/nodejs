const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";
const token = "8qlOkxz4wq";

const requests = {
  fetchTrending: `http://localhost:5500/api/movies/trending/${token}`,
  fetchNetflixOriginals: `http://localhost:5500/api/movies/discover/${token}`,
  fetchTopRated: `http://localhost:5500/api/movies/top-rate/${token}`,
  fetchActionMovies: `http://localhost:5500/api/movies/discover/${token}/28`,
  fetchComedyMovies: `http://localhost:5500/api/movies/discover/${token}/35`,
  fetchHorrorMovies: `http://localhost:5500/api/movies/discover/${token}/27`,
  fetchRomanceMovies: `http://localhost:5500/api/movies/discover/${token}/10749`,
  fetchDocumentaries: `http://localhost:5500/api/movies/discover/${token}/99`,
  fetchSearch: `http://localhost:5500/api/movies/search/${token}`,
};

export default requests;
