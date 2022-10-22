import PropTypes from 'prop-types';
import React from 'react';
import { suggestionShape } from '../prop-types';
import './ChosenSuggestions.css';

export default function ChosenSuggestions({ suggestions }) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="ChosenSuggestions">
      {suggestions.map((item, i) => (
        <li key={i}>{`${item.name} | ${item.times}`}</li>
      ))}
    </ul>
  );
}

ChosenSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(suggestionShape).isRequired,
};
