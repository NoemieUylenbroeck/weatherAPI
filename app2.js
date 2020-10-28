const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.city;
    const apiKey = "5353491f8c68921b0ad4abea7c8cb317";
    const unit ="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> The temperature in "+ query + " is " + temp + " degrees Celsius.</h1>");
            res.write("<p> the weather is currently " + weatherDescription +"</p>");
            res.write("<img src=" + iconImage + ">");
            res.send();
        })
    })
});

app.listen(3000,function(){
    console.log("Server on 3000 activated.");
});


