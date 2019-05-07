import React, {useState} from 'react';
import {UikLayoutMain} from '@uik';

import DropZone from './DropZone';
import LatestFiles from './LatestFiles';

/**
 * [Container description]
 */
const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const handleOnDrop = acceptedFiles =>
    setFiles(accepted => acceptedFiles.concat(accepted));

  return (
    <UikLayoutMain>
      <DropZone onDrop={handleOnDrop} />
      <LatestFiles files={files} />
    </UikLayoutMain>
  );
};

export default Dashboard;
