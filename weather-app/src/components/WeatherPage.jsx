import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/features/weatherSlice";
import { useParams } from "react-router-dom";
import Icons from "./Icons";
import { fetchFiveDayForecast } from "../redux/features/forecastSlice";
import forecastProcessor from "./forecastProcessor";

function WeatherPage() {
  const dispatch = useDispatch();
  const { city } = useParams();
  const weather = useSelector((state) => state.weather.data);
  const forecast = useSelector((state) => state.forecast.data);
  const [processedForecast, setProcessedForecast] = useState({});

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
      dispatch(fetchFiveDayForecast(city));
    }
  }, [dispatch, city]);
  useEffect(() => {
    // forecast verisi değiştiğinde ve undefined değilse işle
    if (forecast?.list) {
      const processedData = forecastProcessor(forecast); // Veriyi işle
      setProcessedForecast(processedData); // İşlenmiş veriyi state'e kaydet
    }
  }, [forecast]);

  console.log(weather);
  console.log(forecast);
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);
  return (
    <>
      <div>
        {weather.name ? (
          <div>
            <div>
              <div>
                {" "}
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>
                <p>{formattedDate}</p>
                <p>{weather.main.temp}°C</p>
                <p>
                  {weather.main.temp_min}°C / {weather.main.temp_max}°C
                </p>
                <p>
                  {weather.weather[0].description}
                  <Icons iconCode={weather.weather[0].icon} />
                </p>
              </div>
              <div>
                <p>Thermal Sensation: {weather.main.feels_like}</p>
                <p>pop: {forecast?.list?.[0].pop}</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
                <p>Air Humudity: {weather.main.humidity}%</p>
                <p>Sea Level: {forecast?.list?.[0].main?.sea_level}m</p>
              </div>
              <div className="flex flex-row">
                <h2>5 Day Forecast for {city}</h2>
                {Object.entries(processedForecast).map(([date, summary]) => (
                  <div key={date}>
                    <h3>{date}</h3>
                    <p>Low: {summary.tempMin}°C</p>
                    <p>High: {summary.tempMax}°C</p>
                    <p>Weather: {summary.weatherMain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default WeatherPage;
