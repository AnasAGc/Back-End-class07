const cities = require("./data/city.json");
const express = require("express");
const cors = require("cors");
const server = express();
const axios = require("axios");
require("dotenv").config();
server.use(cors());

const arr = [];
//localhost:3000/test
server.get("/test", (req, res) => {
  res.send("hello from the route");
});

server.get("/", (req, res) => {
  res.send("This Is The Home Page For ApI");
});

//localhost:3010/weatherForcast?city=bulbasaur

//api.weatherbit.io/v2.0/current?lat=31.5159996&lon=34.4289168&key=0ec2f4c1613941ed9eb3f9aba5c2cf26

https: server.get("/weatherForcast", handleweather);

function handleweather(req, res) {
  let weatherKey = process.env.WEATHER_API_KEY;
  let Latitude = req.query.cityLat;
  let Longitude = req.query.cityLon;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${Latitude}&lon=${Longitude}&key=${weatherKey}`;
  axios.get(url).then((apiWeather) => {
    const weatherTemp = apiWeather.data.data.map((weather) => {
      return new Forcast(weather);
    });
    res.send(weatherTemp);
    console.log(weatherTemp);
  })

  .catch(err =>{
    res.send(`there is an error in getting the data => ${err}`);
})
}

//localhost:3010/movies?cityName=amman
server.get("/movies", getMoviesHandler);
function getMoviesHandler(req, res) {
  let cityName = req.query.cityName;
  let key = process.env.MOVIE_API_KEY;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`;
  axios.get(url).then((apiResult) => {
    const movieArray = apiResult.data.results.map((item) => {
      return new Movies(item);
    });
    res.send(movieArray);
  })

  .catch(err =>{
    res.send(`there is an error in getting the data => ${err}`);
})
}


class Forcast {
  constructor(item) {
    this.description = item.weather.description;
    this.data = item.valid_date;
    this.temp = item.high_temp;
  }
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

server.get("*", (req, res) => {
  res.status(404).send("Sorry This Page Not Found ");
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`listen on Port ${PORT}`);
});
