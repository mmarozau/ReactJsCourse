import React, { useState } from "react";

import ModalContext from "../../contexts/modal-context";
import Modal from "./Modal";

const ModalManager = (props) => {
    const [modalData, setModalData] = useState({ isModalActive: false });

    const createModal = (type, title, content, onClose, onConfirm) => {
        if (modalData.isModalActive) return;
        setModalData({ isModalActive: true, type: type, title: title, content: content, onClose: onClose, onConfirm: onConfirm });
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
            <Modal isModalActive={modalData.isModalActive} type={modalData.type} title={modalData.title} content={modalData.content}
                onModalClose={closeModalHandler} />
            {props.children}
        </ModalContext.Provider>
    );
};

export default ModalManager;
