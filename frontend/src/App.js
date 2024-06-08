import logo from './logo.svg';
import './App.css';
import React from 'react';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>Shadowrun Character Sheets</h1>
            <CharacterForm />
            <CharacterList />
    </div>
  );
}

export default App;
