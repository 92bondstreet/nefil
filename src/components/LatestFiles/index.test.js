import React from 'react';
import LatestFiles from './index';
import {cleanup, render} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<LatestFiles />', () => {
  const MOCK_FILES = [
    {
      'name': 'file-1.png',
      'status': 'ready'
    },
    {
      'location': 'http://hapi.fhir.org/baseDstu3/Binary/1921753/_history/1',
      'name': 'file-2.png',
      'status': 'uploaded'
    },
    {
      'name': 'file-3.png',
      'status': 'in-progress'
    }
  ];

  it('should render the LatestFiles section', () => {
    const {getByText} = render(<LatestFiles files={[]} />);

    expect(getByText(/Latest Uploaded Files/)).toBeInTheDocument();
  });

  it('should render a list of dropped files', () => {
    const {getByTestId} = render(<LatestFiles files={MOCK_FILES} />);
    const tbody = getByTestId('latest-files-tbody');

    expect(tbody.children.length).toBe(3);
  });

  it('should render the status for each file', () => {
    const {getByText} = render(<LatestFiles files={MOCK_FILES} />);

    expect(getByText(/ready/)).toBeInTheDocument();
    expect(getByText(/in-progress/)).toBeInTheDocument();
  });

  it('should render the download link for uploaded file', () => {
    const {getByText} = render(<LatestFiles files={MOCK_FILES} />);

    expect(getByText(/attachment/)).toBeInTheDocument();
  });

  it('should render the date value for uploaded file', () => {
    const date = new Date();
    const files = [
      {
        date,
        'location': 'http://hapi.fhir.org/baseDstu3/Binary/1921753/_history/1',
        'name': 'file-2.png',
        'status': 'uploaded'
      }
    ];
    const {getByText} = render(<LatestFiles files={files} />);

    expect(getByText(new RegExp(date.toLocaleDateString()))).toBeInTheDocument();
  });
});
