import React from 'react';
import LatestFiles from './LatestFiles';
import {cleanup, render} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<LatestFiles />', () => {
  const MOCK_FILES = [
    {
      'name': 'file-1.png'
    },
    {
      'name': 'file-3.png'
    }
  ];

  it('should render the LatestFiles section', () => {
    const {getByText} = render(<LatestFiles files={[]} />);

    expect(getByText(/Latest Uploaded Files/)).toBeInTheDocument();
  });

  it('should render a list of dropped files', () => {
    const {getByTestId} = render(<LatestFiles files={MOCK_FILES} />);
    const tbody = getByTestId('latest-files-tbody');

    expect(tbody.children.length).toBe(2);
  });
});
