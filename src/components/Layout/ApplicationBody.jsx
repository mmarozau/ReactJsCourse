import styles from './ApplicationBody.module.css'

import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';


const ApplicationBody = () => {

    return (
        <div className={styles.body}>
            <Home />
            {/* <SignIn /> */}
        </div>
    );
};

export default ApplicationBody;
