import { useState, useEffect } from 'react';

import './App.css';

import ApplicatioHeader from './components/Layout/ApplicationHeader';
import ApplicationBody from './components/Layout/ApplicationBody';
import ApplicationFooter from './components/Layout/ApplicationFooter';

import Modal from './components/Modal/Modal';
import ModalContext from './contexts/modal-context';


const App = () => {
  useEffect(() => { document.title = 'Mikalai Marozau | ReactJS Course' }, []);

  // modal handlers
  const [isModalActive, setIsModalActive] = useState(false);

  const createModalHandler = (type, title, message, onClose, onConfirm) => {
    setModalData({ type: type, title: title, message: message, onClose: onClose, onConfirm: onConfirm });
    setIsModalActive(true);
  };

  const closeModalHandler = (result) => {
    if (!result && modalData.onClose) {
      modalData.onClose();
    } else if (result && modalData.onConfirm) {
      modalData.onConfirm();
    }

    setIsModalActive(false);
    setModalData({ createModal: createModalHandler });
  };

  const [modalData, setModalData] = useState({ createModal: createModalHandler });
  // modal handlers - end

  return (
    <div className="app-layout">
      <ModalContext.Provider value={modalData}>
        {isModalActive && <Modal type={modalData.type} title={modalData.title} message={modalData.message}
          onModalClose={closeModalHandler} />}
        <div className="app-layout-header">
          <ApplicatioHeader titleLabel={'ReactJS Course'}></ApplicatioHeader>
        </div>
        <div className="app-layout-body">
          <ApplicationBody></ApplicationBody>
        </div>
        <div className="app-layout-footer">
          <ApplicationFooter></ApplicationFooter>
        </div>
      </ModalContext.Provider>
    </div>
  )
};

export default App;
