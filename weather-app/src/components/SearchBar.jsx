import { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity("");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Search location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input rounded w-full text-gray-400 bg-gray-800 focus:border-blue-light focus:ring-2 focus:ring-blue-light focus:outline-none transition duration-300 hover:border-gray-500 hover:bg-gray-600 p-3"
            />
          </div>
        </form>
      </div>
    </>
  );
}
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchBar;
