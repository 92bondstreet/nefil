import React from 'react';
import Dashboard from './index';
import fetchMock from 'fetch-mock';
import {cleanup, fireEvent, render} from 'react-testing-library';
import 'jest-dom/extend-expect';

import {API_FHIR} from '../../constants/api-urls';

const API_FHIR_MATCHER = `begin:${API_FHIR}`;

afterEach(() => {
  cleanup();
  fetchMock.reset();
  fetchMock.restore();
});

const createFile = (name, size, type) => {
  const file = new File([], name, {type});

  Object.defineProperty(file, 'size', {
    get () {
      return size;
    }
  });
  return file;
};

const mockData = (files = []) => {
  return {
    'dataTransfer': {
      files,
      'items': files.map(file => ({
        'kind': 'file',
        'type': file.type,
        'getAsFile': () => file
      })),
      'types': ['Files']
    }
  };
};

const flushPromises = (ui, container) => {
  return new Promise(resolve =>
    setImmediate(() => {
      render(ui, {container});
      resolve(container);
    })
  );
};

// Using fireEvent.* doesn't work for our use case,
// we cannot set the event props
const dispatchEvt = (node, type, data) => {
  const event = new Event(type, {'bubbles': true});

  if (data) {
    Object.assign(event, data);
  }
  fireEvent(node, event);
};

describe('<Dashboard />', () => {
  it('should render an empty list of dropped files for the first time', () => {
    const {getByTestId} = render(<Dashboard />);
    const tbody = getByTestId('latest-files-tbody');

    expect(tbody.children.length).toBe(0);
  });

  it('should drop the given files', async () => {
    const files = [
      createFile('file1.pdf', 1111, 'application/pdf'),
      createFile('file2.pdf', 1111, 'application/pdf'),
      createFile('file3.pdf', 1111, 'application/pdf')
    ];
    const data = mockData(files);
    const ui = <Dashboard />;
    const {container, getByTestId} = render(ui);
    const dropzone = getByTestId('dropzone-div');
    const tbody = getByTestId('latest-files-tbody');

    dispatchEvt(dropzone, 'drop', data);
    await flushPromises(ui, container);
    expect(tbody.children.length).toBe(files.length);
  });

  it('should fetch the history once files dropes', async () => {
    const files = [
      createFile('file1.pdf', 1111, 'application/pdf'),
      createFile('file2.pdf', 1111, 'application/pdf'),
      createFile('file3.pdf', 1111, 'application/pdf')
    ];
    const data = mockData(files);
    const ui = <Dashboard />;
    const {container, getByTestId} = render(ui);
    const dropzone = getByTestId('dropzone-div');

    fetchMock.get(API_FHIR_MATCHER, 200);
    dispatchEvt(dropzone, 'drop', data);
    await flushPromises(ui, container);

    expect(fetchMock.called(API_FHIR_MATCHER)).toBe(true);
  });
});
