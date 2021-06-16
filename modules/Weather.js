'use strict'
const axios = require("axios");

module.exports=handleweather

function handleweather(req, res) {
  let weatherKey = process.env.WEATHER_API_KEY;
  let Latitude = req.query.cityLat;
  let Longitude = req.query.cityLon;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${Latitude}&lon=${Longitude}&key=${weatherKey}`;

  axios
    .get(url)
    .then((apiWeather) => {
      const weatherTemp = apiWeather.data.data.map((weather) => {
        return new Forcast(weather);
      });
      res.send(weatherTemp);
      console.log(weatherTemp);
    })

    .catch((err) => {
      res.send(`there is an error in getting the data => ${err}`);
    });
}


class Forcast {
    constructor(item) {
      this.description = item.weather.description;
      this.data = item.valid_date;
      this.temp = item.high_temp;
    }
  }

