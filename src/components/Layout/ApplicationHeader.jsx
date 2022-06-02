import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../logo.svg'
import styles from './ApplicationHeader.module.css';

const ApplicationHeader = (props) => (
    <div className={styles['header']}>
        <div className={styles['header-title-label-wr']}>
            <div className={styles['header-title-label']}>{props.titleLabel || '<App Title>'}</div>
        </div>
        <div className={styles['header-title-spacer']}></div>
        <div>
            <img src={logo} className={styles['header-img-logo']} alt="logo" />
        </div>
    </div>
);

ApplicationHeader.propTypes = {
    titleLabel: PropTypes.string
};

export default React.memo(ApplicationHeader);
