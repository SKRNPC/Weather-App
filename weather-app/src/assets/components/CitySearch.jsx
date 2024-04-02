import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { fetchWeather } from "../../redux/features/weatherSlice";

function CitySearch() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);

  const handleSearch = (city) => {
    dispatch(fetchWeather(city));
  };
  console.log(weather);
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default CitySearch;
