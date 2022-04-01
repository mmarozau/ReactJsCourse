import './App.css';

import ApplicatioHeader from './components/Layout/ApplicationHeader';
import ApplicationBody from './components/Layout/ApplicationBody';
import ApplicationFooter from './components/Layout/ApplicationFooter';


const App = () => (
  <div className="app-layout">
    <div className="app-layout-header">
      <ApplicatioHeader titleLabel={'ReactJS Course'}></ApplicatioHeader>
    </div>
    <div className="app-layout-body">
      <ApplicationBody></ApplicationBody>
    </div>
    <div className="app-layout-footer">
      <ApplicationFooter></ApplicationFooter>
    </div>
  </div>
);

export default App;
