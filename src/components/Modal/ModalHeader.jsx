import { AiOutlineClose } from 'react-icons/ai';

import styles from './ModalHeader.module.css';


const ModalHeader = ({ title, onModalClose }) => {

    return (
        <div className={styles['modal-title']}>
            <div className={styles['modal-title-label']}>{title}</div>
            <div className={styles['modal-title-close-btn-wrp']} tabIndex="0">
                <div className={styles['modal-title-close-btn']} onClick={onModalClose}>
                    <AiOutlineClose />
                </div>
            </div>
        </div>
    );
};

export default ModalHeader;