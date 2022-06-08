import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../logo.svg'
import styles from './ApplicationHeader.module.css';

import AccessContext from '../../contexts/access-context';


const ApplicationHeader = (props) => {
    const navigate = useNavigate();

    const accessCtx = React.useContext(AccessContext);

    const signButtonHandler = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Enter') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Enter')) return;

        if (accessCtx.currentUser?.id) accessCtx.signUserOff();

        navigate('/signin');
    };

    return (
        <div className={styles['header']}>
            <div className={styles['header-title-label-wr']}>
                <Link to="/" className={styles['header-title-label']}>{props.titleLabel || '<App Title>'}</Link>
            </div>
            <div className={styles['header-title-spacer']}></div>
            <div className={styles['header-menu']}>
                <Link to="home" className={styles['header-menu-item']}>Home</Link>
                <div to="" className={styles['header-menu-item']} tabIndex="0"
                    onClick={signButtonHandler} onKeyDown={signButtonHandler} onKeyUp={signButtonHandler}>
                    {accessCtx.currentUser?.id ? 'Sign out' : 'Sign in'}
                </div>
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
