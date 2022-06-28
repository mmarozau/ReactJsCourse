import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import './App.css';

import ModalPlaceholder from './components/Modal/ModalPlaceholder';

import ApplicationHeader from './components/Layout/ApplicationHeader';
import ApplicationBody from './components/Layout/ApplicationBody';
import ApplicationFooter from './components/Layout/ApplicationFooter';


const App = () => {
  const dispatchGlbStore = useDispatch();

  useEffect(() => { document.title = 'Mikalai Marozau | ReactJS Course' }, []);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json', { responseType: 'json' })
      .then(resp => {
        const loadedCardsData = Array.isArray(resp.data) ? resp.data.slice(0, 15) : [];
        dispatchGlbStore({
          type: 'cards-add', newCards: loadedCardsData.map((el, elIdx) => ({
            id: elIdx,
            title: el.Name,
            text: el.About,
            isSelected: false,
            isEditMode: false
          }))
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="app-layout">
      <ModalPlaceholder />
      <div className="app-layout-header">
        <ApplicationHeader titleLabel={'ReactJS Course'}></ApplicationHeader>
      </div>
      <div className="app-layout-body">
        <ApplicationBody />
      </div>
      <div className="app-layout-footer">
        <ApplicationFooter />
      </div>
    </div>
  );
};

export default App;
