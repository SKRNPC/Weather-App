import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./redux/features/weatherSlice";

function WeatherComponent() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather("Istanbul"));
  }, [dispatch]);

  useEffect(() => {
    console.log("Hava Durumu Verisi:", weather.data);
  }, [weather.data]);
}

export default WeatherComponent;
