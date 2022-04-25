import { useState, useEffect } from 'react';

import './App.css';

import ModalManager from './components/Modal/ModalManager';

import ApplicatioHeader from './components/Layout/ApplicationHeader';
import ApplicationBody from './components/Layout/ApplicationBody';
import ApplicationFooter from './components/Layout/ApplicationFooter';


const App = () => {
  useEffect(() => { document.title = 'Mikalai Marozau | ReactJS Course' }, []);

  return (
    <div className="app-layout">
      <ModalManager>
        <div className="app-layout-header">
          <ApplicatioHeader titleLabel={'ReactJS Course'}></ApplicatioHeader>
        </div>
        <div className="app-layout-body">
          <ApplicationBody />
        </div>
        <div className="app-layout-footer">
          <ApplicationFooter />
        </div>
      </ModalManager>
    </div>
  )
};

export default App;
