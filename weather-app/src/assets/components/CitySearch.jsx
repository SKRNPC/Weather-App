import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { fetchWeather } from "../../redux/features/weatherSlice";

function CitySearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (city) => {
    dispatch(fetchWeather(city));
    navigate(`/weather/${city}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default CitySearch;
