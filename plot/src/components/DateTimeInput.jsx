import PropTypes from "prop-types";

const DateTimeInput = ({ label, value, handleChange }) => {
  return (
    <div>
      <span className="timer-span">{label}</span>{" "}
      <input
        className="timer-input"
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

DateTimeInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
};

export default DateTimeInput;
