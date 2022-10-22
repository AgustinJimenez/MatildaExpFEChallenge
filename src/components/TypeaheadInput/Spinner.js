import PropTypes from 'prop-types';
import React from 'react';

export default function TypeaheadInputSpinner({ show }) {
  if (!show) return null;
  return (
    <div className="spinner">
      <div className="bounce-1"></div>
      <div className="bounce-2"></div>
      <div className="bounce-3"></div>
    </div>
  );
}

TypeaheadInputSpinner.propTypes = {
  show: PropTypes.bool,
};

TypeaheadInputSpinner.defaultProps = {
  show: false,
};
