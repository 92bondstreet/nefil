import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import PropTypes from 'prop-types';
import {UikButton, UikWidget, UikWidgetHeader, UikWidgetContent} from '@uik';

import {useDropzone} from 'react-dropzone';

import styles from './dropzone.module.scss';

const DropZone = props => {
  const {onDrop} = props;
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <UikWidget margin>
      <UikWidgetHeader>
        <Emoji symbol="🎯 " label="Drop" /> Drop Zone for Your Files
      </UikWidgetHeader>
      <UikWidgetContent>
        <div data-testid="dropzone-div"
          {...getRootProps({'className': 'dropzone'})}
          className={styles.dropzone}
        >
          <input {...getInputProps()} />
          <p className={styles.message}>
            Drag and drop some files here, or{' '}
            <UikButton primary>click here</UikButton> to select files
          </p>
        </div>
      </UikWidgetContent>
    </UikWidget>
  );
};

DropZone.propTypes = {
  'onDrop': PropTypes.func.isRequired
};

export default DropZone;
