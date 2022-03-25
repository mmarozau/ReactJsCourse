// import logo from './logo.svg';
import './App.css';

import ApplicatioHeader from './components/ApplicationHeader';
import ApplicationBody from './components/ApplicationBody';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className="app-layout">
      <div className="app-layout-header">
        <ApplicatioHeader titleLabel={'ReactJS Course'}></ApplicatioHeader>
      </div>
      <div className="app-layout-body">
        <ApplicationBody></ApplicationBody>
      </div>
    </div>
  );
}

export default App;
