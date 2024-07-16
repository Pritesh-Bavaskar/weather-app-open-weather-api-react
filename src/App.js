import "./App.css";
import CurrentWeather from "./components/current_weather/current_weather";
import Search from "./components/search/search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import weather_icon from "./weather_icon.json";
import Lottie from "lottie-react";
import img from "./back_img.png";
import ClothingRecommendation from "./components/clothing_rec/clothing_rec";
import { Padding } from "@mui/icons-material";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const myStyle = {
    overflow: "hidden",
    backgroundImage: `url(${img})`,
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const weatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    console.log("weatherFetch", weatherFetch, "forecastFetch", forecastFetch);

    Promise.all([weatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log("weather : ", weather, "|| forecast : ", forecast);
  return (
    <div style={myStyle}>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />

        <div className="animation-box">
          {!weather && (
            <Lottie className="animation" animationData={weather_icon} />
          )}
        </div>
        <div className="animation-box">
          {!weather && (
            <p>
              Uncover Your City's Weather Forecast: Find the Latest Updates Now!
            </p>
          )}
        </div>
        {weather && <CurrentWeather data={weather} />}
        <div className="forecast">
          {forecast && <Forecast data={forecast} />}
        </div>
        {weather && <ClothingRecommendation data={weather} />}
      </div>
    </div>
  );
}

export default App;
