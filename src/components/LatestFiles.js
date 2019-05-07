import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import PropTypes from 'prop-types';
import {UikWidget, UikWidgetHeader, UikWidgetTable} from '@uik';

const LatestFiles = props =>
  <UikWidget margin {...props}>
    <UikWidgetHeader>
      <Emoji symbol="🗃️" label="Files" /> Latest Uploaded Files
    </UikWidgetHeader>
    <UikWidgetTable>
      <thead>
        <tr>
          <th>File Name</th>
        </tr>
      </thead>
      <tbody data-testid="latest-files-tbody">
        {props.files.map((file, index) =>
          <tr key={index}>
            <td key={index}>{file.name}</td>
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
