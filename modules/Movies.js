'use strict'
const axios = require("axios");

module.exports=getMoviesHandler;

function getMoviesHandler(req, res) {
  let cityName = req.query.cityName;
  let key = process.env.MOVIE_API_KEY;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`;

  axios
    .get(url)
    .then((apiResult) => {
      const movieArray = apiResult.data.results.map((item) => {
        return new Movies(item);
      });
      res.send(movieArray);
    })

    .catch((err) => {
      res.send(`there is an error in getting the data => ${err}`);
    });
}

class Movies {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.averageVotes = item.vote_average;
    this.popularity = item.popularity;
    this.totalVotes = item.vote_count;
    this.imagel = item.poster_path;
    this.popularity = item.popularity;
    this.releasedOn = item.release_date;
  }
}