import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './ModalHeader.module.css';


const ModalHeader = ({ title, onModalClose }) => {

    const onButtonHandler = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        onModalClose();
    }

    return (
        <div className={styles['modal-title']}>
            <div className={styles['modal-title-label']}>{title}</div>
            <div className={styles['modal-title-close-btn-wrp']}>
                <div className={styles['modal-title-close-btn']} onClick={onButtonHandler}
                    onKeyDown={onButtonHandler} onKeyUp={onButtonHandler} tabIndex="0">
                    <AiOutlineClose />
                </div>
            </div>
        </div>
    );
};

ModalHeader.propTypes = {
    title: PropTypes.string,
    onModalClose: PropTypes.func.isRequired
};

export default ModalHeader;
