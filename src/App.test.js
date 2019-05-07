import React from 'react';
import App from './App';
import {cleanup, render} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

it('should render the Header section', () => {
  const {getByText} = render(<App />);

  expect(getByText(/Medical Reports/)).toBeInTheDocument();
});

it('should render the Dashboard section', () => {
  const {getByText} = render(<App />);

  expect(getByText(/Drop Zone for Your Files/)).toBeInTheDocument();
  expect(getByText(/Uploaded Files/)).toBeInTheDocument();
});
