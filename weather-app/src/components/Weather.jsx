import React, { useRef, useState } from "react";
import "./Weather.css";
import { useEffect } from "react";
import clear_img from "../assets/clear.png";
import cloud_img from "../assets/cloud.png";
import drizzle_img from "../assets/drizzle.png";
import humidity_img from "../assets/humidity.png";
import rain_img from "../assets/rain.png";
import snow_img from "../assets/snow.png";
import wind_img from "../assets/wind.png";

function Weather() {
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_img,
    "01n": clear_img,
    "02d": cloud_img,
    "02n": cloud_img,
    "03d": cloud_img,
    "03n": cloud_img,
    "04d": drizzle_img,
    "04n": drizzle_img,
    "09d": rain_img,
    "09n": rain_img,
    "10d": rain_img,
    "10n": rain_img,
    "13d": snow_img,
    "13n": snow_img,
  };
  const [weatherData, setWeatherData] = useState(false);
  async function apiCallSearch(city) {
    if (city === "") {
      alert("Please enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cf2639d811375b128aeac2ea51aa8693`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);

      const iconCode = data.weather[0].icon; // Correct key for icon
      const icon = allIcons[iconCode] || clear_img; // Use default if icon not found
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetching weather data");
    }
  }

  useEffect(() => {
    console.log("hii");
    apiCallSearch("Pune");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        {/* here i have mentioned useRef  */}
        <input ref={inputRef} type="text" placeholder="Search city" />
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            apiCallSearch(inputRef.current.value);
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
      </div>

      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°c</p>
      <p className="city">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_img} alt="gsss" />
          <div>
            <p>{weatherData.humidity} %</p> <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_img} alt="ssfs" />
          <div>
            <p>{weatherData.windSpeed}km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
