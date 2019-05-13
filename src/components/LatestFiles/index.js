import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import PropTypes from 'prop-types';
import {Uikon, UikWidget, UikWidgetHeader, UikWidgetTable} from '@uik';

import styles from './latestfiles.module.scss';

/**
 * Format file name with attachment link if available
 * @param  {Object} file
 * @param  {Integer} index
 * @return {HTMLElement}
 */
const getName = (file, index) => {
  if (file.location) {
    return (
      <td key={`name-${index}`}>
        <Uikon>attachment</Uikon>{' '}
        <a href={file.location} className={styles.attachment}>{file.name}</a>
      </td>
    );
  }

  return <td key={`name-${index}`}>{file.name}</td>;
};

const LatestFiles = props =>
  <UikWidget margin {...props} className={styles.container}>
    <UikWidgetHeader>
      <Emoji symbol="🗃️" label="Files" /> Latest Uploaded Files
    </UikWidgetHeader>
    <UikWidgetTable>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Date</th>
          <th className={styles.status}>Status</th>
        </tr>
      </thead>
      <tbody data-testid="latest-files-tbody">
        {props.files.map((file, index) =>
          <tr key={index}>
            {getName(file, index)}
            <td key={`date-${index}`} title={file.date && file.date.toLocaleTimeString()}>{file.date && file.date.toLocaleDateString() || '-'}</td>
            <td
              key={`status-${index}`}
              className={`${styles.value} ${styles[file.status]} ${
                styles.status
              }`}
            >
              {file.status}
            </td>
          </tr>
        )}
      </tbody>
    </UikWidgetTable>
  </UikWidget>

;

LatestFiles.propTypes = {
  'files': PropTypes.array.isRequired
};

export default LatestFiles;
