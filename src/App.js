import * as React from 'react';

import {
  UikWidgetContent,
  UikWidget,
  UikHeadline,
  UikDivider,
  UikButton,
  Uikon
} from '@uik';

import '@uik/styles.css';
import '@uik/index.scss';
import styles from './app.module.scss';

const BuildingsSignUp = () =>
  <div className={styles.pageWrapper}>
    <UikWidget className={styles.widgetWrapper}>
      <div className={styles.content}>
        <UikWidgetContent className={styles.left}>
          <UikHeadline>Ready for UI Kit 3.0</UikHeadline>
          <UikDivider margin />
          <h3 className={styles.headline}>
            <a
              href="http://preview.janlosert.com/docs/start/project-structure"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kit Documentation
            </a>
          </h3>
          <UikButton className={styles.btnAction} success>
            Get Started With Screen Previews
            <Uikon>rocket</Uikon>
          </UikButton>
        </UikWidgetContent>
      </div>
    </UikWidget>
  </div>

;

export default BuildingsSignUp;
