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
import PreSvg from "../images/svg/pressure.svg";
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
        <div className="p-5 flex flex-col xl:flex-row sm:h-auto lg:min-h-screen xl:h-screen">
          <div className="flex flex-col w-full xl:w-1/2 sm:h-1/2 lg:h-1/2 xl:h-auto">
            <div className="">
              <CitySearch />
            </div>
            <WeatherBackground weatherDescription={weather.weather[0].icon} />
          </div>
          <div className="flex flex-col xl:ml-5 ml-0 w-full xl:w-1/2">
            <div className="rounded-xl mt-3 xl:mt-0 bg-gray-800 p-3 font-bold text-gray-200  xl:justify-end justify-center">
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
                    <img src={PreSvg} alt="" />
                  </div>
                  <p className="p-1 ml-2">Pressure</p>
                  <div className="p-1 ml-auto flex justify-between">
                    <p>{`${forecast?.list?.[0].main?.pressure}hPa`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-gray-800 text-gray-50 flex xl:h-auto items-center p-3 xl:justify-end justify-center">
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
