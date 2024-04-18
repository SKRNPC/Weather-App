import PropTypes from "prop-types";
import ClearDay from "../images/bg-cards/ClearDay.png";
import { useState } from "react";
import WeatherPage from "./WeatherPage";

function BgImage({ bgCode }) {
  const [backgroundImage, setBackgroundImage] = useState("");
  <WeatherPage backgroundImage={backgroundImage} />;
  console.log("bgCode:", bgCode);
  let bgImage = "";
  useState(() => {
    switch (bgCode) {
      case "01d":
        bgImage = ClearDay;
        break;
      case "01n":
        bgImage = ClearDay;
        break;
      case "02d":
        bgImage = ClearDay;
        break;
      case "02n":
        bgImage = ClearDay;
        break;
      case "03d":
        bgImage = ClearDay;
        break;
      case "03n":
        bgImage = ClearDay;
        break;
      case "04d":
        bgImage = ClearDay;
        break;
      case "04n":
        bgImage = ClearDay;
        break;
      case "10d":
        bgImage = ClearDay;
        break;
      case "10n":
        bgImage = ClearDay;
        break;
      case "11d":
        bgImage = ClearDay;
        break;
      case "11n":
        bgImage = ClearDay;
        break;
      case "13d":
        bgImage = ClearDay;
        break;
      case "13n":
        bgImage = ClearDay;
        break;
      default:
        bgImage = ""; // Default background image if no match
        break;
    }
    setBackgroundImage(bgImage);
  }, [bgCode]);
}
BgImage.propTypes = {
  bgCode: PropTypes.string.isRequired,
};
export default BgImage;
