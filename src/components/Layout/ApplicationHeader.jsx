import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg'
import styles from './ApplicationHeader.module.css';

import AccessContext from '../../contexts/access-context';


const ApplicationHeader = (props) => {

    const accessCtx = React.useContext(AccessContext);

    return (
        <div className={styles['header']}>
            <div className={styles['header-title-label-wr']}>
                <div className={styles['header-title-label']}>{props.titleLabel || '<App Title>'}</div>
            </div>
            <div className={styles['header-title-spacer']}></div>
            <div className={styles['header-menu']}>
                <Link to="home" className={styles['header-menu-item']}>Home</Link>
                <Link to="signin" className={styles['header-menu-item']}>{accessCtx.currentUser?.id ? 'Re-Sign in' : 'Sign in'}</Link>
            </div>
            <div>
                <img src={logo} className={styles['header-img-logo']} alt="logo" />
            </div>
        </div>
    );
};

ApplicationHeader.propTypes = {
    titleLabel: PropTypes.string
};

export default React.memo(ApplicationHeader);
