import React, { useState } from "react";
import { UikLayoutMain } from "@uik";

import DropZone from "./DropZone";
import LatestFiles from "./LatestFiles";

/**
 * [Container description]
 */
const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const handleOnDrop = acceptedFiles =>
    setFiles(files => acceptedFiles.concat(files));

  return (
    <UikLayoutMain>
      <DropZone onDrop={handleOnDrop} />
      <LatestFiles files={files} />
    </UikLayoutMain>
  );
};

export default Dashboard;
