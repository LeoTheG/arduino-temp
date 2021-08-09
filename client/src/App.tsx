import "./App.css";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useState } from "react";

interface IWeatherPoint {
  temperature: string;
  humidity: string;
  time: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<IWeatherPoint[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/weather-data")
      .then((result) => result.json())
      .then((result: { weatherData: IWeatherPoint[] }) => {
        console.log("got weather data", result);
        setWeatherData(
          result.weatherData.map((dataPoint) => ({
            ...dataPoint,
            time: new Date(dataPoint.time).toLocaleString(),
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      <div className="weather-data-container">
        <div className="weather-data-title">Weather Data</div>
        {weatherData.map((weatherPoint: any) => {
          const { temperature, humidity, time } = weatherPoint;
          return (
            <div key={time} className="data-point-container">
              <div> data point:</div>
              <div>temperature: {temperature}F</div>
              <div>humidity: {humidity}%</div>
              <div>time: {time}</div>
              {/* <div>time: {new Date(time).toLocaleString()}</div> */}
            </div>
          );
        })}
      </div>
      <WeatherLineChart data={weatherData} />
    </div>
  );
}

export default App;

const WeatherLineChart = ({ data }: { data: IWeatherPoint[] }) => {
  return (
    <LineChart
      width={800}
      height={600}
      data={data}
      //   margin={{
      //     top: 5,
      //     right: 30,
      //     left: 20,
      //     bottom: 5,
      //   }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="temperature"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
    </LineChart>
  );
};
