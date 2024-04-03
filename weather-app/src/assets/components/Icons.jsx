import PropTypes from "prop-types";

function Icons({ iconCode }) {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div>
      <img src={iconUrl} alt="Weather Icon" />
    </div>
  );
}
Icons.propTypes = {
  iconCode: PropTypes.string.isRequired,
};
export default Icons;
