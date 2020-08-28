const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const url = "mongodb://localhost:27017/mydb";
let db;

app.use(bodyParser.json());
app.use(cors());

app.get("/weather-data", async (req, res) => {
  const weatherData = await db.collection("weather").find({}).toArray();
  console.log("got weather data = ", weatherData);

  res.status(200).send({ weatherData });
});

app.post("/weather-update", (req, res) => {
  const { temperature, humidity } = req.body;

  console.log("got temp, humidity = ", temperature, humidity);
  insertWeather(Number(temperature), Number(humidity));

  res.status(200).end();
});

app.listen(port, () => console.log("listening on port", port));

const insertWeather = (temperature, humidity) => {
  db.collection("weather").insertOne(
    { temperature, humidity, time: Date.now() },
    function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    }
  );
};

MongoClient.connect(url, function (err, _db) {
  if (err) throw err;
  console.log("Connected to database!");
  db = _db.db("mydb");

  //   db.createCollection("weather", function(err, res) {
  //     if (err) throw err;
  //     console.log("Collection created!");
  //     _db.close();
  //   });
});
