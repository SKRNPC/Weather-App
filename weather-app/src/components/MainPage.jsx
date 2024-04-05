import CitySearch from "./CitySearch";
import LogoSvg from "../images/svg/marca.svg";

function MainPage() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between items-center text-white">
        <h1 className="font-bold p-5 mt-10">
          <img src={LogoSvg} alt="" />
        </h1>
        <div className="flex flex-col justify-center items-center text-center h-full w-full">
          <h1 className="font-bold p-1 flex flex-row">
            Welcome to
            <span className=" text-blue-light ml-1"> TypeWeather</span>
          </h1>
          <p className="text-xs text-gray-200 ">
            Choose a location to see the weather forecast
          </p>
          <div className="p-5 w-full">
            <CitySearch />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
