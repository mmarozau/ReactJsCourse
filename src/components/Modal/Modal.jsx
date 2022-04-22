import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

import styles from './Modal.module.css';

import ModalHeader from './ModalHeader';
import ModalButton from './ModalButton';


const Modal = ({ type, title, message, onModalClose }) => {
    const modalType = (type && ['information', 'confirmation'].includes(type)) ? type : 'information';
    const modalTitle = title || (modalType === 'information' ? 'Information' : 'Confirmation');

    const modalCloseHandler = () => {
        onModalClose(false);
    };

    const modalConfirmHandler = () => {
        onModalClose(true);
    };

    const modalKeyPressHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.code === 'Escape') modalCloseHandler();
    };

    return (
        <div onKeyDown={modalKeyPressHandler} onKeyUp={modalKeyPressHandler}>
            <div className={styles.modal}>
                <div className={styles['title-block']}>
                    <ModalHeader title={modalTitle} onModalClose={modalCloseHandler} />
                </div>
                <div className={styles['body-block']}>{message || ''}</div>
                {modalType === 'information' ? (<div className={styles['buttons-block']}>
                    <ModalButton onButton={modalCloseHandler}><span>Ok</span></ModalButton></div>) : null}
                {modalType === 'confirmation' ? (
                    <div className={styles['buttons-block']}>
                        <ModalButton onButton={modalCloseHandler}><AiOutlineClose style={{ color: 'red' }} />
                            <span>Cancel</span></ModalButton>
                        <ModalButton onButton={modalConfirmHandler}><AiOutlineCheck style={{ color: 'green' }} />
                            <span>Yes</span></ModalButton>
                    </div>
                ) : null}
            </div>
            <div className={styles.overlay} onClick={modalCloseHandler}></div>
        </div>
    );
};

export default Modal;