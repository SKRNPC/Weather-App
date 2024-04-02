import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const API_KEY = "afa452d4984319c7e712b7879bafa8c9";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Hava durumu verisi alınırken bir hata oluştu:", error);
    }
  };

  return (
    <div>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir adı girin"
        />
        <button type="submit">Hava Durumunu Getir</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Hava Durumu: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
