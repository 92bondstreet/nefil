import React from 'react';
import Analytics from './index';
import {cleanup, render} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<Analytics />', () => {
  const MOCK_HISTORY = [
    {
      'total-binary': '1234',
      'total-all': '56789',
      'last-binary': '01/10/2019',
      'ping': 'up'
    },
    {
      'total-binary': '1234',
      'total-all': '56789',
      'last-binary': '01/10/2019',
      'ping': 'down'
    }
  ];

  it('should render the Analytics section', () => {
    const {getByText} = render(<Analytics analytics={{}} />);

    expect(getByText(/Analytics/)).toBeInTheDocument();
  });

  it('should render box with analytics values', () => {
    const {getByText} = render(<Analytics analytics={MOCK_HISTORY[0]} />);

    expect(getByText(/1234/)).toBeInTheDocument();
    expect(getByText(/56789/)).toBeInTheDocument();
    expect(getByText(/01\/10\/2019/)).toBeInTheDocument();
    expect(getByText(/Up/)).toBeInTheDocument();
  });

  it('should render down status box for down server', () => {
    const {getByText} = render(<Analytics analytics={MOCK_HISTORY[1]} />);

    expect(getByText(/Down/)).toBeInTheDocument();
  });
});
