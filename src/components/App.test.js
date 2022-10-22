import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Matilda Typeahead', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Matilda Typeahead/i);
  expect(title).toBeInTheDocument();
});
