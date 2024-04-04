import PropTypes from "prop-types";

function Icons({ iconCode }) {
  console.log("Icon Code:", iconCode);
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  return <img src={iconUrl} alt="Weather Icon" />;
}
Icons.propTypes = {
  iconCode: PropTypes.string.isRequired,
};
export default Icons;
