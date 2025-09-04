import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import Cards from './Cards';
import { LanguageProvider, useLanguage } from './LanguageContext';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('game');
  const { translate, toggleLanguage } = useLanguage();

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
        <h1 className="app-title">{translate('appTitle')}</h1>
        
        <div className="header-controls">
          <div className="tabs-container">
            <button 
              className={`tab-button ${activeTab === 'game' ? 'active' : ''}`}
              onClick={() => setActiveTab('game')}
            >
              {translate('gameTab')}
            </button>
            <button 
              className={`tab-button ${activeTab === 'cards' ? 'active' : ''}`}
              onClick={() => setActiveTab('cards')}
            >
              {translate('cardsTab')}
            </button>
          </div>
          
          <button 
            className="language-button"
            onClick={toggleLanguage}
            title="Change Language / Mudar Idioma"
          >
            {translate('languageButton')}
          </button>
        </div>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;