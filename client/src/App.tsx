import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState<
    { temperature: string; humidity: string; time: string }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:8000/weather-data")
      .then((result) => result.json())
      .then((result) => {
        console.log("got weather data", result);
        setWeatherData(result.weatherData);
      });
  }, []);
  return (
    <div className="App">
      <div className="weather-data-container">
        Weather data:
        {weatherData.map((weatherPoint) => {
          const { temperature, humidity, time } = weatherPoint;
          return (
            <div key={time} className="data-point-container">
              <div> data point:</div>
              <div>temperature: {temperature}F</div>
              <div>humidity: {humidity}%</div>
              <div>time: {new Date(time).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
