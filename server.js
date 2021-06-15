const cities=require('./data/city.json')
const express=require('express');
const cors=require('cors');
const server=express();
const axios = require('axios');
require('dotenv').config();
server.use(cors());

const arr=[]
//localhost:3000/test
server.get('/test',(req,res) =>{
    
    res.send('hello from the route');
})

server.get('/',(req,res)=>{
    res.send('This Is The Home Page For ApI')
})


//localhost:3010/weatherForcast?city=bulbasaur

https://api.weatherbit.io/v2.0/current?lat=31.5159996&lon=34.4289168&key=0ec2f4c1613941ed9eb3f9aba5c2cf26

server.get('/weatherForcast',handleweather)

function handleweather(req,res){
    let weatherKey=process.env.WEATHER_API_KEY
    let Latitude=req.query.cityLat
    let Longitude=req.query.cityLon


    let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${Latitude}&lon=${Longitude }&key=${weatherKey}`
    axios.get(url).then(apiWeather=>{
        const weatherTemp= apiWeather.data.data.map((weather)=>{
            return new Forcast(weather)
        })
        res.send(weatherTemp);
        console.log(weatherTemp);
    })
}



class Forcast{
    constructor(item){

        this.description=item.weather.description;
        this.data=item.valid_date;
        this.temp=item.high_temp;
    }
}



        
        server.get('*',(req,res)=>{
            res.status(404).send('Sorry This Page Not Found ')
        })
        
        const PORT=process.env.PORT || 3002
        server.listen(PORT,()=>{
            console.log(`listen on Port ${PORT}`)
        })