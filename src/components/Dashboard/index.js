import React, {useEffect, useReducer} from 'react';
import {UikLayoutMain} from '@uik';
import uuidv4 from 'uuid/v4';

import * as actions from '../../actions/fhir';
import Analytics from '../Analytics';
import DashboardReducer from '../../reducers/dashboard';
import DropZone from '../DropZone';
import LatestFiles from '../LatestFiles';
import * as types from '../../constants/action-types';
import * as dashboard from '../../constants/dashboard';

import styles from './dashboard.module.scss';
/**
 * Dashboard container
 *  - Display the dropzone
 *  - Display the list of latest uploaded files
 *  - Upload files to fihr server
 *  - Display server status
 */
const Dashboard = () => {
  const initialState = {
    'analytics': {
      'total-binary': '-',
      'total-all': '-',
      'last-binary': '-',
      'ping': '-'
    },
    'files': []
  };
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  useEffect(() => {
    actions.readHistory(dispatch);
  }, []);

  /**
   * Handle the drag'n'drop files
   * @param  {Array} acceptedFiles
   * @return
   */
  const handleOnDrop = async acceptedFiles => {
    // first, generate uuid and status for each file
    const files = acceptedFiles.map(file => {
      file.uuid = uuidv4();
      file.status = dashboard.STATUS_READY;

      return file;
    });

    // then, upload files to fhir server
    // and compute the analytics history
    dispatch({'type': types.DROP_FILE, files});
    await actions.createFiles(acceptedFiles, dispatch);
    actions.readHistory(dispatch);

    return;
  };

  return (
    <UikLayoutMain>
      <DropZone onDrop={handleOnDrop} />
      <div className={ styles.tables }>
        <LatestFiles files={state.files} />
        <Analytics analytics={state.analytics} />
      </div>
    </UikLayoutMain>
  );
};

export default Dashboard;
