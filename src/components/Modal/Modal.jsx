import PropTypes from 'prop-types';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import FocusTrap from 'focus-trap-react';

import styles from './Modal.module.css';

import ModalHeader from './ModalHeader';
import ModalButton from './ModalButton';


const Modal = ({ isModalActive, type, title, content, onModalClose }) => {
    const modalType = (type && ['information', 'confirmation'].includes(type)) ? type : 'information';
    const modalTitle = title || (modalType === 'information' ? 'Information' : 'Confirmation');

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
                </FocusTrap>
            ) : null}
        </>

    );
};

Modal.propTypes = {
    isModalActive: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['information', 'confirmation']),
    title: PropTypes.string,
    content: PropTypes.any,
    onModalClose: PropTypes.func.isRequired
};

export default Modal;
