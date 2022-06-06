import { Routes, Route } from 'react-router-dom';

import styles from './ApplicationBody.module.css'

import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';


const ApplicationBody = () => {

    return (
        <div className={styles.body}>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/*" element={null}></Route>
            </Routes>
        </div>
    );
};

export default ApplicationBody;
