import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/features/weatherSlice";
import { useParams } from "react-router-dom";
import Icons from "./Icons";

function ListCity() {
  const dispatch = useDispatch();
  const { city } = useParams();
  const weather = useSelector((state) => state.weather.data);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);

  console.log(weather);

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
      {" "}
      <div>
        {weather.name ? (
          <div>
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>{formattedDate}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>
              Weather: {weather.weather[0].description}
              <Icons iconCode={weather.weather[0].icon} />
            </p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
    </>
  );
}

export default ListCity;
