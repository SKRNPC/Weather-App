import SearchBar from "./SearchBar";

function MainPage() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between items-center text-white">
        <h1 className="font-bold p-5 mt-10">Weather</h1>
        <div className="flex flex-col justify-center items-center text-center h-full w-full">
          <h1 className="font-bold p-1 flex flex-row">
            Welcome to<span className="text-orange-300 ml-1"> Weather</span>
          </h1>
          <p className="text-xs text-orange-100 ">
            Choose a location to see the weather forecast
          </p>
          <div className="p-5 w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
