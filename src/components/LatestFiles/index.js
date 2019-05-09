import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import PropTypes from 'prop-types';
import {UikWidget, UikWidgetHeader, UikWidgetTable} from '@uik';

import styles from './latestfiles.module.scss';

const LatestFiles = props =>
  <UikWidget margin {...props} className={styles.container}>
    <UikWidgetHeader>
      <Emoji symbol="🗃️" label="Files" /> Latest Uploaded Files
    </UikWidgetHeader>
    <UikWidgetTable>
      <thead>
        <tr>
          <th>File Name</th>
          <th className={styles.status}>Status</th>
        </tr>
      </thead>
      <tbody data-testid="latest-files-tbody">
        {props.files.map((file, index) =>
          <tr key={index}>
            <td key={`name-${index}`}>{file.name}</td>
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
