function SearchBar() {
  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search location"
            className="input border rounded w-full max-w-sm text-black focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300 hover:border-yellow-500 hover:bg-yellow-100 p-3"
          />
        </div>
      </div>
    </>
  );
}

export default SearchBar;
