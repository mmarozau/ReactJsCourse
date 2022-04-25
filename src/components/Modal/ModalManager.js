import React, { useState } from "react";

import ModalContext from "../../contexts/modal-context";
import Modal from "./Modal";

const ModalManager = (props) => {
    const [modalData, setModalData] = useState({ isModalActive: false });

    const createModal = (type, title, message, onClose, onConfirm) => {
        if (modalData.isModalActive) return;
        setModalData({ isModalActive: true, type: type, title: title, message: message, onClose: onClose, onConfirm: onConfirm });
    };

    const closeModalHandler = (result) => {
        if (!result && modalData.onClose) {
            modalData.onClose();
        } else if (result && modalData.onConfirm) {
            modalData.onConfirm();
        }
        setModalData({ isModalActive: false });
    };

    return (
        <ModalContext.Provider value={{ createModal }}>
            {modalData.isModalActive && <Modal type={modalData.type} title={modalData.title} message={modalData.message}
                onModalClose={closeModalHandler} />}
            {props.children}
        </ModalContext.Provider>
    );
};

export default ModalManager;
