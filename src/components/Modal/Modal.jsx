import PropTypes from 'prop-types';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import FocusTrap from 'focus-trap-react';

import styles from './Modal.module.css';

import ModalHeader from './ModalHeader';
import ModalButton from './ModalButton';

import { modalTypes } from './modal-constants.js';


const Modal = ({ isModalActive, type, title, content, onModalClose }) => {
    const modalType = (type && Object.values(modalTypes).includes(type)) ? type : modalTypes.TYPE_INFO;
    const modalTitle = title || type;

    const modalCloseHandler = () => {
        onModalClose(false);
    };

    const modalConfirmHandler = () => {
        onModalClose(true);
    };

    const modalKeyPressHandler = (event) => {
        if (event.code === 'Escape') modalCloseHandler();
    };

    return (
        <>
            {isModalActive ? (
                <FocusTrap>
                    <div onKeyDown={modalKeyPressHandler}>
                        <div className={styles.modal}>
                            <div className={styles['title-block']}>
                                <ModalHeader title={modalTitle} onModalClose={modalCloseHandler} />
                            </div>
                            <div className={styles['body-block']}>{content || ''}</div>
                            {modalType === modalTypes.TYPE_INFO ? (<div className={styles['buttons-block']}>
                                <ModalButton onButton={modalCloseHandler}><span>Ok</span></ModalButton></div>) : null}
                            {modalType === modalTypes.TYPE_CONF ? (
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
                </FocusTrap>
            ) : null}
        </>

    );
};

Modal.propTypes = {
    isModalActive: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.values(modalTypes)),
    title: PropTypes.string,
    content: PropTypes.any,
    onModalClose: PropTypes.func.isRequired
};

export default Modal;
