import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import Cards from './Cards';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'game':
        return <Game />;
      case 'cards':
        return <Cards />;
      default:
        return <Game />;
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <img 
          src="https://educaportinari.com.br/landingpage/img/logo.png" 
          alt="Logo Educa Portinari" 
          className="app-logo"
        />
        <h1 className="app-title">English Learning Hub</h1>
        
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => setActiveTab('game')}
          >
            🎮 Spelling Bee Game
          </button>
          <button 
            className={`tab-button ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            📚 Flashcards
          </button>
        </div>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;