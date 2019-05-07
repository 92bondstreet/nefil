import * as React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

import {UikContainerHorizontal, UikContainerVertical} from '@uik';

import '@uik/styles.css';
import '@uik/index.scss';
import styles from './app.module.scss';

const App = () =>
  <UikContainerHorizontal className={styles.app}>
    <UikContainerVertical>
      <Header />
      <Dashboard />
    </UikContainerVertical>
  </UikContainerHorizontal>

;

export default App;
