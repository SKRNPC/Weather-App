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
import WeatherBackground from "./WeatherBackground";
import CitySearch from "./CitySearch";

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
  return (
    <div>
      {weather.name ? (
        <div className="p-5 flex flex-row h-screen">
          <div className="flex flex-col w-1/2">
            <div className="">
              <CitySearch />
            </div>
            <WeatherBackground weatherDescription={weather.weather[0].icon} />
          </div>
          <div className="flex flex-col ml-5 w-1/2">
            <div className="rounded-xl bg-gray-800 p-3 font-bold text-gray-200">
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
            <div className="mt-3 rounded-xl bg-gray-800 text-gray-50 flex h-screen items-center p-3">
              {Object.entries(processedForecast).map(([date, summary]) => (
                <div
                  key={date}
                  className="flex flex-col justify-center items-center w-1/5"
                >
                  <h3>{date}</h3>
                  <div className="w-20">
                    <Icons iconCode={summary.iconCode} />
                  </div>

                  <p>{Math.round(summary.tempMax)}°C</p>
                  <p>{Math.round(summary.tempMin)}°C</p>
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
