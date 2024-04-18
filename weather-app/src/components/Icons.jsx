import PropTypes from "prop-types";
import ClearDay from "../images/icons/01d.png";
import ClearNight from "../images/icons/01n.png";
import FewCloudsDay from "../images/icons/02d.png";
import FewCloudsNight from "../images/icons/02d.png";
import CloudyDay from "../images/icons/03d.png";
import Cloudynight from "../images/icons/03n.png";
import RainyDay from "../images/icons/10d.png";
import RainyNight from "../images/icons/10n.png";
import StormDay from "../images/icons/11d.png";
import StormNight from "../images/icons/11n.png";
import SnowyDay from "../images/icons/13d.png";
import SnowyNight from "../images/icons/13n.png";
function Icons({ iconCode }) {
  console.log("Icon Code:", iconCode);
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  switch (iconCode) {
    case "01d":
      return <img src={ClearDay} alt="" />;
    case "01n":
      return <img src={ClearNight} alt="" />;
    case "02d":
      return <img src={FewCloudsDay} alt="" />;
    case "02n":
      return <img src={FewCloudsNight} alt="" />;
    case "03d":
      return <img src={CloudyDay} alt="" />;
    case "03n":
      return <img src={Cloudynight} alt="" />;
    case "04d":
      return <img src={CloudyDay} alt="" />;
    case "04n":
      return <img src={Cloudynight} alt="" />;
    case "10d":
      return <img src={RainyDay} alt="" />;
    case "10n":
      return <img src={RainyNight} alt="" />;
    case "11d":
      return <img src={StormDay} alt="" />;
    case "11n":
      return <img src={StormNight} alt="" />;
    case "13d":
      return <img src={SnowyDay} alt="" />;
    case "13n":
      return <img src={SnowyNight} alt="" />;
    default:
      return <img src={iconUrl} alt="" />;
  }
}
Icons.propTypes = {
  iconCode: PropTypes.string.isRequired,
};
export default Icons;
