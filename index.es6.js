import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const MultiToggle = ({
  selectedOption,
  options,
  onSelectOption,
  className,
  label
}) => {
  // If required variables aren't passed, return empty
  if (!options || selectedOption === null) return null;

  const numOptions = options.length;

  const columnWidth = numOptions ? 100 / numOptions : numOptions;

  const isSelectedOption = option => option.value == selectedOption;

  const getSelectedIndex = () => {
    const indexFound = options.findIndex(option => isSelectedOption(option));
    return indexFound > -1 ? indexFound : 0;
  };

  const createToggleOption = (...args) => {
    const { value, displayName, isDisabled } = args[0];

    const selectOption = () => onSelectOption(value);

    const optionClass = classNames("toggleOption", {
      selected: isSelectedOption(args[0]),
      optionDisabled: isDisabled
    });

    const optionStyle = {
      width: `${columnWidth}%`
    };

    return (
      <div
        key={args[1]}
        onClick={isDisabled ? null : selectOption}
        className={optionClass}
        style={optionStyle}
      >
        {displayName || value}
      </div>
    );
  };

  const toggleClass = classNames("toggleContainer", className);
  const toggleStyle = {
    width: `${columnWidth}%`,
    transform: `translateX(${100 * getSelectedIndex()}%)`,
    WebkitTransform: `translateX(${100 * getSelectedIndex()}%)`,
    MozTransform: `translateX(${100 * getSelectedIndex()}%)`,
    msTransform: `translateX(${100 * getSelectedIndex()}%)`
  };

  const selectedToggleClass = classNames(
    "toggle",
    options[getSelectedIndex()].optionClass
  );

  const renderLabel = label ? <label>{label}</label> : null;

  return (
    <div className="toggle-wrapper">
      {renderLabel}
      <div className={toggleClass}>
        {options.map(createToggleOption)}
        <div className={selectedToggleClass} style={toggleStyle} />
      </div>
    </div>
  );
};

MultiToggle.propTypes = {
  className: PropTypes.any,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.any.isRequired,
  onSelectOption: PropTypes.func,
  label: PropTypes.any
};

export default MultiToggle;
