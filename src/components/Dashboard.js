import React, {useReducer} from 'react';
import {UikLayoutMain} from '@uik';
import uuidv4 from 'uuid/v4';

import * as actions from '../actions/fhir';
import DashboardReducer from '../reducers/dashboard';
import DropZone from './DropZone';
import LatestFiles from './LatestFiles';
import * as types from '../constants/action-types';
import * as dashboard from '../constants/dashboard';

/**
 * Dashboard container
 *  - Display the dropzone
 *  - Display the list of latest uploaded files
 *  - Upload files to fihr server
 *  - Display status
 */
const Dashboard = () => {
  const initialState = {
    'files': []
  };
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  /**
   * Concat list of dropped files
   * @param  {Array} acceptedFiles
   * @return {Array}
   */
  const handleOnDrop = acceptedFiles => {
    // generate uuid and status for each file
    const files = acceptedFiles.map(file => {
      file.uuid = uuidv4();
      file.status = dashboard.STATUS_READY;

      return file;
    });

    dispatch({'type': types.DROP_FILE, files});
    acceptedFiles.forEach(file => {
      actions.createFile(file, dispatch);
    });

    return;
  };

  return (
    <UikLayoutMain>
      <DropZone onDrop={handleOnDrop} />
      <LatestFiles files={state.files} />
    </UikLayoutMain>
  );
};

export default Dashboard;
