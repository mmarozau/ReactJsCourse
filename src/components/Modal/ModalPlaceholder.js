import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Modal from "./Modal";


const ModalPlaceholder = (props) => {
    const glbModalData = useSelector((state) => state.modal);
    const dispatchGlbStore = useDispatch();

    const [modalData, setModalData] = useState({ isModalActive: false });

    const closeModalHandler = (result) => {
        if (!result && modalData.onClose) {
            modalData.onClose();
        } else if (result && modalData.onConfirm) {
            modalData.onConfirm();
        }
        setModalData({ isModalActive: false });
        dispatchGlbStore({ type: 'modal-close' });
    };

    useEffect(() => {
        if (glbModalData.isActive === true) {
            setModalData({
                isModalActive: true,
                type: glbModalData.type,
                title: glbModalData.title,
                content: glbModalData.content,
                onClose: glbModalData.onClose,
                onConfirm: glbModalData.onConfirm
            });
        } else if (modalData.isActive === true) {
            setModalData({ isModalActive: false });
        };
    }, [glbModalData.isActive]);

    return (
        <Modal isModalActive={modalData.isModalActive} type={modalData.type} title={modalData.title} content={modalData.content}
            onModalClose={closeModalHandler} />
    );
};

export default ModalPlaceholder;
