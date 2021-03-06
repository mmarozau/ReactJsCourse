import { useEffect } from 'react';

import './App.css';

import AccessManager from './components/SignIn/AccessManager';
import ModalManager from './components/Modal/ModalManager';
import CardsDataManager from './components/Card/CardDataManager';

import ApplicationHeader from './components/Layout/ApplicationHeader';
import ApplicationBody from './components/Layout/ApplicationBody';
import ApplicationFooter from './components/Layout/ApplicationFooter';


const App = () => {
  useEffect(() => { document.title = 'Mikalai Marozau | ReactJS Course' }, []);

  return (
    <AccessManager>
      <div className="app-layout">
        <ModalManager>
          <div className="app-layout-header">
            <ApplicationHeader titleLabel={'ReactJS Course'}></ApplicationHeader>
          </div>
          <div className="app-layout-body">
            <CardsDataManager><ApplicationBody /></CardsDataManager>
          </div>
          <div className="app-layout-footer">
            <ApplicationFooter />
          </div>
        </ModalManager>
      </div>
    </AccessManager>
  );
};

export default App;
