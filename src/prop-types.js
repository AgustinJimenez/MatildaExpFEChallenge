import PropTypes from 'prop-types';

export const suggestionShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  times: PropTypes.number.isRequired,
});
