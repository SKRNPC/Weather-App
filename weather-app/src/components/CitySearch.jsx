import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function CitySearch() {
  const navigate = useNavigate();

  const handleSearch = (city) => {
    -navigate(`/weather/${city}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default CitySearch;
