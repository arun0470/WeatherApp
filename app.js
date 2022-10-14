const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const cityname = req.body.cityName;
  const units = "metric";
  const apikey = "efd0ab4889ab45ca6c9fdc50b5243c02";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units="+units+"&appid="+apikey;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDiscripton = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p> the weather is currently "+weatherDiscripton+"</p>");
      res.write("<h1>temperature in "+cityname+" is "+temp+" degrees  celsius</h1>")
      res.write("<img src="+imgurl+">");
      res.send();
    });
  });
});



app.listen(3000,function(){
  console.log("server is running on port 3000");
});
