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
    <div className="min-h-screen">
      {weather.name ? (
        <div className="p-3">
          <div
            className="rounded-xl bg-gray-800 overflow-hidden text-gray-50 flex w-full 
           max-w-3xl mx-auto p-3"
          >
            <div className="flex flex-col flex-grow">
              <div className="">
                <div className="flex flex-col p-1">
                  <h2 className="flex mt-1">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="flex text-xs">{formattedDate}</p>
                </div>
                <div className="flex justify-between ">
                  <div className="flex flex-col p-1 mt-16">
                    <p className="flex text-5xl">{weather.main.temp}°c</p>
                    <p className="flex mt-3 text-sm">
                      {weather.main.temp_min}°c / {weather.main.temp_max}°c
                    </p>
                    <p className="flex">
                      {weather.weather[0].description.charAt(0).toUpperCase() +
                        weather.weather[0].description.slice(1)}
                    </p>
                  </div>
                  <div className="flex items-end justify-end">
                    <Icons iconCode={weather.weather[0].icon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 ">
            <div className="mt-3 rounded-xl bg-gray-800 overflow-hidden text-gray-50 w-full max-w-3xl mx-auto p-3">
              <div className="flex flex-col justify-between space-y-3">
                {[
                  ["Thermal Sensation", weather.main.feels_like],
                  ["Probability of rain", forecast?.list?.[0].pop],
                  ["Wind Speed", `${weather.wind.speed} m/s`],
                  ["Air Humidity", `${weather.main.humidity}%`],
                  ["Sea Level", `${forecast?.list?.[0].main?.sea_level}m`],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className={`flex justify-between ${
                      index === 4 ? "" : "border-b border-gray-700"
                    } py-2`}
                  >
                    <p className="ml-5">{label}:</p>
                    <p className="mr-5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-gray-800 overflow-hidden text-gray-50 flex w-full max-w-3xl mx-auto p-3">
            <div className="m-2 text-center flex justify-between w-full ">
              {Object.entries(processedForecast).map(([date, summary]) => (
                <div key={date} className="">
                  <h3>{date}</h3>
                  <Icons iconCode={summary.iconCode} />
                  <p>{summary.tempMax}°C</p>
                  <p>{summary.tempMin}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default WeatherPage;
