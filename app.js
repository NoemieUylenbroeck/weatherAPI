const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q=Brussel&appid=5353491f8c68921b0ad4abea7c8cb317&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> The temperature in Brussel is " + temp + " degrees Celsius.</h1>");
            res.write("<p> the weather is currently " + weatherDescription +"</p>");
            res.write("<img src=" + iconImage + ">");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server on 3000 activated.");
})