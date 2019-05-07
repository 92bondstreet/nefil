import * as React from 'react';
import Emoji from 'a11y-react-emoji';
import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
} from '@uik';

import styles from './header.module.scss';

const AnalyticsHeader = props => (
  <UikTopBar { ...props }>
    <UikTopBarSection>
      <UikTopBarTitle large>
        <Emoji symbol="👩‍⚕️ 📊" label="Doctor" className={styles.emoji}/>  Medical Reports Dashboard Analytics
      </UikTopBarTitle>
    </UikTopBarSection>
  </UikTopBar>
)

export default AnalyticsHeader
