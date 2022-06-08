import React from 'react';

import styles from './ApplicationFooter.module.css';

const ApplicationFooter = () => (
    <div className={styles.footer}>
        <div className={styles['footer-title-label-wr']}>
            <div className={styles['footer-title-label']}>{'IBA-Gomel Employee Education'}</div>
        </div>
    </div>
);

export default React.memo(ApplicationFooter);
