const cities=require('./data/city.json')
const express=require('express');
const cors=require('cors');
const server=express();
server.use(cors());

const arr=[]
//localhost:3000/test
server.get('/test',(req,res) =>{
    
    res.send('hello from the route');
})

server.get('/',(req,res)=>{
    res.send('This Is The Home Page For ApI')
})


//localhost:3010/getPoke?city=bulbasaur

server.get('/weather',(req,res)=>{
        let couuntry=req.query.cityName
        let lat=req.query.cityLat
        let lon=req.query.cityLon

        let citywither=cities.city.find(item=>{
                   if( item.lat == lat && item.lon==lon){
                       return item;
                   }
            })
            let cast=new Forecast(citywither.date,citywither.description)
            arr.push(cast)
            res.send({citywither});
            console.log(`listen on Port `)
        
        })

        class Forecast {
            constructor( date1, description1){
                 this.date = date1;
                 this.description= description1;
            }
        }
        
        
        server.get('*',(req,res)=>{
            res.status(404).send('Sorry This Page Not Found ')
        })
        
        const PORT=3002
        server.listen(PORT,()=>{
            console.log(`listen on Port ${PORT}`)
        })