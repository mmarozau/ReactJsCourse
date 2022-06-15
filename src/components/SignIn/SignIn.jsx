import { useState, useReducer, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './SignIn.module.css';

import InputBox from '../InputBox/InputBox';

import AccessContext from '../../contexts/access-context';


const SignIn = () => {

    const accessCtx = useContext(AccessContext);

    const inputIdReducer = (prevState, action) => {
        return { value: action, isValid: (action !== '' && action.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) }
    };

    const inputPWReducer = (prevState, action) => {
        return { value: action, isValid: (action.length >= 8 && action.match(/(?=.*\d)(?=.*[a-z])/ig)) }
    };

    const [isValidating, setIsValidating] = useState(false);
    const [userId, dispatchUserId] = useReducer(inputIdReducer, { value: '', isValid: false });
    const [userPW, dispatchUserPW] = useReducer(inputPWReducer, { value: '', isValid: false });

    const inputIdHandler = (event) => {
        dispatchUserId(event.target.value);
    };

    const inputPWHandler = (event) => {
        dispatchUserPW(event.target.value);
    };

    const signInButtonHandler = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && (event.code !== 'Space' && event.code !== 'Enter'))) return;



        if (userId.isValid && userPW.isValid) {
            accessCtx.signUserIn(userId, userPW);
        } else if (!isValidating) setIsValidating(true);
    };

    const enterHandler = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Enter') {
            event.preventDefault();
            event.stopPropagation();

            signInButtonHandler(event);
        };
    }

    const labelStyle = {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 500
    };

    return (
        <div className={styles['signin-body']}>
            <div className={styles['signin-box']} onKeyDown={enterHandler}>
                <span className={styles['signin-title']}>Sign-In</span>
                <div>
                    <InputBox label="User id / Email" labelStyle={labelStyle} isInvalid={isValidating && !userId.isValid}
                        value={userId.value} changeHandler={inputIdHandler} />
                    <div style={{ margin: '8px 0' }}></div>
                    <InputBox label="Password" labelStyle={labelStyle} isInvalid={isValidating && !userPW.isValid} type="password"
                        value={userPW.value} changeHandler={inputPWHandler} />
                </div>
                <div className={styles['signin-warning-msg']}
                    style={(!isValidating || (userId.isValid && userPW.isValid)) ? { color: 'transparent', cursor: 'default', userSelect: 'none' } : {}}>
                    Please enter valid user name and password.
                </div>
                <button className={styles['signin-button'] + (!(userId.isValid && userPW.isValid) ? ` ${styles['disabled']}` : '')} type="button" onClick={signInButtonHandler}>Continue</button>
            </div>
            {accessCtx?.currentUser?.id && <Navigate to="/home" />}
        </div >
    );
};

export default SignIn;
