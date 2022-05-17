import PropTypes from 'prop-types';

import styles from './ModalButton.module.css';


const ModalButton = ({ children, onButton }) => {

    const onButtonHandler = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        onButton();
    }

    return (
        <div className={styles['button-wrp']}>
            <div className={styles['button']} onClick={onButtonHandler} onKeyDown={onButtonHandler} onKeyUp={onButtonHandler} tabIndex="0">
                <div className={styles['button-label']}>{children}</div>
            </div>
        </div>
    );
};

ModalButton.propTypes = {
    children: PropTypes.any.isRequired,
    onButton: PropTypes.func.isRequired
};

export default ModalButton;
