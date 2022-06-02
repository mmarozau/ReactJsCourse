import { useState, useReducer } from 'react';

import styles from './SignIn.module.css';


const SignIn = () => {

    const inputReducer = (prevState, action) => {
        return { value: action, isValid: (action !== '') }
    }

    const [isValidating, setIsValidating] = useState(false);
    const [userId, dispatchUserId] = useReducer(inputReducer, { value: '', isValid: false });
    const [userPassword, dispatchUserPassword] = useReducer(inputReducer, { value: '', isValid: false });

    const inputIdHandler = (event) => {
        dispatchUserId(event.target.value);
    };

    const inputPasswordHandler = (event) => {
        dispatchUserPassword(event.target.value);
    };

    const signInButtonHandler = () => {
        if (!isValidating) setIsValidating(true);
    };

    return (
        <div className={styles['signin-body']}>
            <div className={styles['signin-box']}>
                <span className={styles['signin-title']}>Sign-In</span>
                <div>
                    <div>
                        <div className={styles['signin-input-label']}>User name</div>
                        <input className={`${styles['signin-input-field']}${(isValidating && !userId.isValid) ? (' ' + styles['not-valid']) : ''}`}
                            type="text" value={userId.value} onChange={inputIdHandler}></input>
                    </div>
                    <div style={{ margin: '8px 0' }}></div>
                    <div>
                        <div className={styles['signin-input-label']}>Password</div>
                        <input className={`${styles['signin-input-field']}${(isValidating && !userPassword.isValid) ? (' ' + styles['not-valid']) : ''}`}
                            type="password" value={userPassword.value} onChange={inputPasswordHandler}></input>
                    </div>
                </div>
                <div className={styles['signin-warning-msg']}
                    style={(!isValidating || (userId.isValid && userPassword.isValid)) ? { color: 'transparent', cursor: 'default', userSelect: 'none' } : {}}>
                    Please enter valid user name and password.
                </div>
                <button className={styles['signin-button']} type="button" onClick={signInButtonHandler}>Continue</button>
            </div>
        </div >
    );
};

export default SignIn;
