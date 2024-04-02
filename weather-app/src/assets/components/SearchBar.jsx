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
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input border rounded w-full max-w-sm text-black focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300 hover:border-yellow-500 hover:bg-yellow-100 p-3"
            />
            <button
              type="submit"
              className="ml-2 p-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch fonksiyon tipinde ve zorunlu olmalı
};
export default SearchBar;
