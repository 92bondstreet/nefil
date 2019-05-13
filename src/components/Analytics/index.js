import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import PropTypes from 'prop-types';
import {
  UikButton,
  UikContentTitle,
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent
} from '@uik';

import styles from './analytics.module.scss';

const STATUS = {
  'up': <UikButton success>Up</UikButton>,
  'down': <UikButton error>Down</UikButton>,
  'default': <UikButton primary isLoading />
};

const getStatus = ping => {
  return STATUS[ping] || STATUS.default;
};

const Analytics = props => {
  return (
    <UikWidget margin className={styles.container}>
      <UikWidgetHeader>
        <Emoji symbol="📈" label="Bar chart" /> Analytics
      </UikWidgetHeader>
      <UikWidgetContent>
        <UikWidget margin>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <UikContentTitle>total binary</UikContentTitle>
              <div className={styles.boxContent}>
                <span className={styles.boxValue}>
                  {props.analytics['total-binary']}
                </span>
              </div>
            </div>
            <div className={styles.box}>
              <UikContentTitle>total resources</UikContentTitle>
              <div className={styles.boxContent}>
                <span className={styles.boxValue}>
                  {props.analytics['total-all']}
                </span>
              </div>
            </div>
            <div className={styles.box}>
              <UikContentTitle>latest binary upload</UikContentTitle>
              <div className={styles.boxContent}>
                <span className={styles.boxValue}>
                  {props.analytics['last-binary'].toLocaleString()}
                </span>
              </div>
            </div>
            <div className={styles.box}>
              <UikContentTitle>Server status</UikContentTitle>
              <div className={styles.boxContent}>
                {getStatus(props.analytics.ping)}
              </div>
            </div>
          </div>
        </UikWidget>
      </UikWidgetContent>
    </UikWidget>
  );
};

Analytics.propTypes = {
  'analytics': PropTypes.object.isRequired
};

export default Analytics;
