import React, {useEffect} from 'react';
import classNames from 'classnames/bind';
import * as desktop from '../../actions/desktop';
import Emoji from 'a11y-react-emoji';
import isElectron from 'is-electron';
import PropTypes from 'prop-types';
import {UikButton, UikWidget, UikWidgetHeader, UikWidgetContent} from '@uik';
import {useDropzone} from 'react-dropzone';
import {DROP_ACCEPT_MIME_TYPES, DROP_MAX_SIZE_BYTES} from '../../constants/dropzone';

import styles from './dropzone.module.scss';

// Alternate bind version (for css-modules)
// https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules
const cx = classNames.bind(styles);

const DropZone = props => {
  const {onDrop} = props;
  const {
    getRootProps,
    getInputProps,
    inputRef,
    isDragActive,
    isDragReject,
    open
  } = useDropzone({
    onDrop,
    'accept': DROP_ACCEPT_MIME_TYPES,
    'maxSize': DROP_MAX_SIZE_BYTES,
    // Disable click and keydown behavior
    'noClick': true,
    'noKeyboard': true
  });
  const dropZoneClass = cx({
    'dropzone': true,
    'drag-active': isDragActive,
    'drag-reject': isDragReject
  });

  /**
   * Hook to watch new added files
   * only for the desktop
   * @param  {Red} inputRef
   */
  useEffect(() => {
    /* istanbul ignore next */
    if (isElectron()) {
      desktop.watch(inputRef.current);
    }
  }, [inputRef]);

  return (
    <UikWidget margin>
      <UikWidgetHeader>
        <Emoji symbol="🎯 " label="Drop" /> Drop Zone for Your Files
      </UikWidgetHeader>
      <UikWidgetContent>
        <div
          data-testid="dropzone-div"
          {...getRootProps({'className': 'dropzone'})}
          className={dropZoneClass}
        >
          <input {...getInputProps()} />
          <p className={styles.message}>
            Drag and drop <strong>PDF files (less than 2 Mo)</strong> here, or{' '}
            <UikButton primary onClick={open}>
              click here
            </UikButton>{' '}
            to select files
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
