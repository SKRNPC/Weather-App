import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/features/weatherSlice";
import { useParams } from "react-router-dom";
import Icons from "./Icons";
import { fetchFiveDayForecast } from "../redux/features/forecastSlice";
import forecastProcessor from "./forecastProcessor";
import ThermoSvg from "../images/svg/thermal.svg";
import PopSvg from "../images/svg/pop.svg";
import WindSvg from "../images/svg/wind.svg";
import RulerSvg from "../images/svg/ruler.svg";
import AirSvg from "../images/svg/air-hum.svg";

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
        <div className="p-5">
          <div
            className="rounded-xl bg-gray-800 overflow-hidden text-gray-50 flex w-full 
           max-w-3xl mx-auto p-3"
          >
            <div className="flex flex-col flex-grow">
              <div className="">
                <div className="flex flex-col p-1">
                  <h2 className="flex mt-1 font-bold">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="flex text-xs font-thin">{formattedDate}</p>
                </div>
                <div className="flex justify-between ">
                  <div className="flex flex-col p-1 mt-16">
                    <p className="flex text-5xl font-bold">
                      {weather.main.temp}°c
                    </p>
                    <p className="flex mt-3 text-sm font-thin">
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

          <div className="mt-3 rounded-xl bg-gray-800 overflow-hidden w-full max-w-3xl mx-auto p-3 font-bold text-gray-200">
            <div className="border-b border-gray-500 my-4">
              <div className="flex flex-row items-center my-4 ">
                <div className="items center ml-1">
                  <img src={ThermoSvg} alt="" />
                </div>
                <p className="p-1 ml-3">Thermal Sensation</p>
                <div className="p-1 ml-auto flex justify-between">
                  <p>{weather.main.feels_like}</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-500 my-4">
              <div className="flex flex-row items-center my-4 ">
                <div className="items center">
                  <img src={PopSvg} alt="" />
                </div>
                <p className="p-1 ml-2">Probability of rain</p>
                <div className="p-1 ml-auto flex justify-between">
                  <p>{forecast?.list?.[0].pop}</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-500 my-4">
              <div className="flex flex-row items-center my-4 ">
                <div className="items center">
                  <img src={WindSvg} alt="" />
                </div>
                <p className="p-1 ml-2">Wind Speed</p>
                <div className="p-1 ml-auto flex justify-between">
                  <p>{`${weather.wind.speed} m/s`}</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-500 my-4">
              <div className="flex flex-row items-center my-4 ">
                <div className="items center">
                  <img src={AirSvg} alt="" />
                </div>
                <p className="p-1 ml-2">Air Humidity</p>
                <div className="p-1 ml-auto flex justify-between">
                  <p>{`%${weather.main.humidity}`}</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-500 my-4">
              <div className="flex flex-row items-center my-4 ">
                <div className="items center">
                  <img src={RulerSvg} alt="" />
                </div>
                <p className="p-1 ml-2">Sea Level</p>
                <div className="p-1 ml-auto flex justify-between">
                  <p>{`${forecast?.list?.[0].main?.sea_level}m`}</p>
                </div>
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
