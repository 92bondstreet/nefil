import React from 'react';
import Dashboard from './Dashboard';
import {cleanup, fireEvent, render} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

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
});
