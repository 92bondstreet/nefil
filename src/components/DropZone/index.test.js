import React from 'react';
import DropZone from './index';
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

// More https://github.com/react-dropzone/react-dropzone/blob/master/src/index.spec.js
describe('<DropZone />', () => {
  let files;

  beforeEach(() => {
    files = [createFile('file1.pdf', 1111, 'application/pdf')];
  });

  it('should render the DropZone section', () => {
    const {getByText} = render(<DropZone onDrop={() => {}} />);

    expect(getByText(/Drop Zone for Your Files/)).toBeInTheDocument();
  });

  it('should drop the given files', async () => {
    const data = mockData(files);
    const onDrop = jest.fn();
    const ui = <DropZone onDrop={onDrop} />;
    const {container, getByTestId} = render(ui);
    const dropzone = getByTestId('dropzone-div');

    dispatchEvt(dropzone, 'drop', data);
    await flushPromises(ui, container);
    expect(onDrop).toHaveBeenCalled();
  });
});
