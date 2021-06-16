const cities = require("./data/city.json");
const express = require("express");
const cors = require("cors");
const server = express();
const axios = require("axios");
require("dotenv").config();
server.use(cors());

const arr = [];
server.get("/test", (req, res) => {
  res.send("hello from the route");
});

server.get("/", (req, res) => {
  res.send("This Is The Home Page For ApI");
});
const handleweather =require ('./modules/Weather')
server.get("/weatherForcast", handleweather);

const getMoviesHandle =require ('./modules/Movies')
server.get("/movies", getMoviesHandle);

server.get("*", (req, res) => {
  res.status(404).send("Sorry This Page Not Found ");
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`listen on Port ${PORT}`);
});
