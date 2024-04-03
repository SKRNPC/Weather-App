import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/features/weatherSlice";
import { useParams } from "react-router-dom";

function ListCity() {
  const dispatch = useDispatch();
  const { city } = useParams();
  const weather = useSelector((state) => state.weather.data);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);
  return (
    <>
      {" "}
      <div>
        {weather.name ? (
          <div>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
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
