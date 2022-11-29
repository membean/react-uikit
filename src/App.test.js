import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders "Sample Form" header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Sample Form/i);
  expect(headerElement).toBeInTheDocument();
});
