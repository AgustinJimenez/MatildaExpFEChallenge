import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { suggestionShape } from "../../prop-types";

const SuggestionsList = React.forwardRef(
  ({ suggestions, cursor, onSuggestionClick, onSuggestionHover }, ref) => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul ref={ref} tabIndex="-1">
        {suggestions.map((item, i) => (
          <li
            key={item.name}
            className={clsx({ highlight: cursor === i })}
            onClick={() => onSuggestionClick(item)}
            onMouseEnter={() => onSuggestionHover(i)}
          >
            <span className="name">{item.name}</span>
            <span className="times">{item.times}</span>
          </li>
        ))}
      </ul>
    );
  }
);

SuggestionsList.propTypes = {
  suggestions: PropTypes.arrayOf(suggestionShape).isRequired,
  cursor: PropTypes.number,
  onSuggestionClick: PropTypes.func.isRequired,
  onSuggestionHover: PropTypes.func.isRequired,
};

SuggestionsList.defaultProps = {
  cursor: undefined,
};

export default SuggestionsList;
