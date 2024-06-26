import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./redux/features/weatherSlice";
import SearchBar from "./assets/components/SearchBar";

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
