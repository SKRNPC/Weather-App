import PropTypes from "prop-types";
import ClearDay from "../images/bg-cards/ClearDay.png";
import ClearNight from "../images/bg-cards/ClearNight.png";
import FCloudsDay from "../images/bg-cards/FewCloudsDay.png";
import FCloudsNight from "../images/bg-cards/FewCloudsNight.png";
import CloudyDay from "../images/bg-cards/CloudyDay.png";
import CloudyNight from "../images/bg-cards/CloudyNight.png";
import RainyDay from "../images/bg-cards/RainyDay.png";
import RainyNight from "../images/bg-cards/RainyNight.png";
import StormDay from "../images/bg-cards/StormDay.png";
import StormNight from "../images/bg-cards/StormNight.png";
import DefaultBackground from "../images/bg-cards/ClearDay.png";
import WeatherPage from "./WeatherPage";
import { useSelector } from "react-redux";
import Icons from "./Icons";
const WeatherBackground = ({ weatherDescription }) => {
  let backgroundImage = DefaultBackground;
  const weather = useSelector((state) => state.weather.data);

  // Hava durumu açıklamasına göre arka plan resmini belirle
  switch (weatherDescription) {
    case "01d":
      backgroundImage = ClearDay;
      break;
    case "01n":
      backgroundImage = ClearNight;
      break;
    case "02d":
      backgroundImage = FCloudsDay;
      break;
    case "02n":
      backgroundImage = FCloudsNight;
      break;
    case "03d":
      backgroundImage = CloudyDay;
      break;
    case "03n":
      backgroundImage = CloudyNight;
      break;
    case "04d":
      backgroundImage = CloudyDay;
      break;
    case "04n":
      backgroundImage = CloudyNight;
      break;
    case "9d":
      backgroundImage = RainyDay;
      break;
    case "9n":
      backgroundImage = RainyNight;
      break;
    case "10d":
      backgroundImage = RainyDay;
      break;
    case "10n":
      backgroundImage = RainyNight;
      break;
    case "11d":
      backgroundImage = StormDay;
      break;
    case "11n":
      backgroundImage = StormNight;
      break;
    case "13d":
      backgroundImage = CloudyDay;
      break;
    case "13n":
      backgroundImage = CloudyNight;
      break;
    default:
      backgroundImage = DefaultBackground;
      break;
  }
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);
  <WeatherPage backgroundImage={backgroundImage} />;
  return (
    <div
      className="rounded-xl bg-gray-800 text-gray-50 flex h-auto sm:h-screen mt-3"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col w-1/2 justify-between">
        <div className="flex flex-col p-8 sm:p-12">
          <h2 className="flex mt-1 text-xl sm:text-3xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="flex text-sm font-thin">{formattedDate}</p>
        </div>
        <div className="flex flex-col p-8 sm:p-12 mb-4 ">
          <p className="flex text-3xl sm:text-5xl font-bold">
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
      </div>
      <div className="flex w-1/2 items-end justify-end ">
        <div className="flex-end">
          <Icons iconCode={weather.weather[0].icon} />
        </div>
      </div>
    </div>
  );
};

WeatherBackground.propTypes = {
  weatherDescription: PropTypes.string.isRequired,
};

export default WeatherBackground;
