import React, { useState, useMemo } from 'react';
import './App.css';

const classColors = {
  'Death Knight': { border: '#c41e3b', bg: '#f0c5ce' },
  'Demon Hunter': { border: '#a330c9', bg: '#e7cbf1' },
  'Druid': { border: '#ff7c0a', bg: '#fedec8' },
  'Evoker': { border: '#33937f', bg: '#d6e9e5' },
  'Hunter': { border: '#aad372', bg: '#eaf4dd' },
  'Mage': { border: '#68ccef', bg: '#daf2fa' },
  'Monk': { border: '#00ffba', bg: '#caffee' },
  'Paladin': { border: '#f48cba', bg: '#fce2ee' },
  'Priest': { border: '#f0ebe0', bg: '#fbfaf7' },
  'Rogue': { border: '#fff468', bg: '#fffcdb' },
  'Shaman': { border: '#2359ff', bg: '#d4ddff' },
  'Warlock': { border: '#9382c9', bg: '#e4e0f1' },
  'Warrior': { border: '#c69b6d', bg: '#f0e6db' }
};

const allCharacters = [
  { id: 1, name: 'Bael', class: 'Warlock', favoriteRank: 18, realm: 'Ravenholdt' },
  { id: 2, name: 'Djem', class: 'Paladin', favoriteRank: 19, realm: 'Ravenholdt' },
  { id: 3, name: 'Gilash', class: 'Priest', favoriteRank: 14, realm: 'Ravenholdt' },
  { id: 4, name: 'Gildish', class: 'Warlock', favoriteRank: 20, realm: 'Ravenholdt' },
  { id: 5, name: 'Gilesh', class: 'Warrior', favoriteRank: 17, realm: 'Ravenholdt' },
  { id: 6, name: 'Gilia', class: 'Monk', favoriteRank: 12, realm: 'Ravenholdt' },
  { id: 7, name: 'Gililimmu', class: 'Rogue', favoriteRank: 23, realm: 'Ravenholdt' },
  { id: 8, name: 'Gilimin', class: 'Hunter', favoriteRank: 15, realm: 'Ravenholdt' },
  { id: 9, name: 'Gilimmu', class: 'Hunter', favoriteRank: 22, realm: 'Ravenholdt' },
  { id: 10, name: 'Gilmin', class: 'Mage', favoriteRank: 16, realm: 'Ravenholdt' },
  { id: 11, name: 'Gilu', class: 'Warlock', favoriteRank: 11, realm: 'Ravenholdt' },
  { id: 12, name: 'Gilussu', class: 'Shaman', favoriteRank: 24, realm: 'Ravenholdt' },
  { id: 13, name: 'Griz', class: 'Rogue', favoriteRank: 8, realm: 'Ravenholdt' },
  { id: 14, name: 'Lao', class: 'Druid', favoriteRank: 9, realm: 'Ravenholdt' },
  { id: 15, name: 'Lau', class: 'Hunter', favoriteRank: 13, realm: 'Ravenholdt' },
  { id: 16, name: 'Lepita', class: 'Rogue', favoriteRank: 21, realm: 'Ravenholdt' },
  { id: 17, name: 'Locke', class: 'Warrior', favoriteRank: 5, realm: 'Ravenholdt' },
  { id: 18, name: 'Loki', class: 'Mage', favoriteRank: 1, realm: 'Ravenholdt' },
  { id: 19, name: 'Rach', class: 'Demon Hunter', favoriteRank: 2, realm: 'Ravenholdt' },
  { id: 20, name: 'Renée', class: 'Paladin', favoriteRank: 4, realm: 'Ravenholdt' },
  { id: 21, name: 'Rukh', class: 'Hunter', favoriteRank: 6, realm: 'Ravenholdt' },
  { id: 22, name: 'Tabitha', class: 'Death Knight', favoriteRank: 3, realm: 'Ravenholdt' },
  { id: 23, name: 'Tabs', class: 'Warrior', favoriteRank: 10, realm: 'Ravenholdt' },
  { id: 24, name: 'Thaler', class: 'Warlock', favoriteRank: 7, realm: 'Ravenholdt' },
].map(char => ({
  ...char,
  image: `/images/${char.name}2.jpg`,
  faceImage: `/images/${char.name}.jpg`
}));

function RotateCcw({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  );
}

function SwordsIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor">
      <path d="m13.593 18.962-6.729 7.035c-.135.142-.061.383.128.417l3.932.683a.23.23 0 0 0 .205-.068l3.428-3.584 7.684 7.93 3.927-4.106.346-.362 3.725-3.896-7.684-7.928 3.646-3.814a.25.25 0 0 0 .066-.213l-.654-4.112a.232.232 0 0 0-.398-.133l-6.853 7.167L7.485 4.401V.428A.42.42 0 0 0 7.075 0H.791a.42.42 0 0 0-.409.428v6.571c0 .236.183.427.409.427h3.512zm27.505 15.599-3.8 3.972-.24.251-3.958 4.139 18.652 19.411L61.562 64l-1.671-9.882zM63.209.017h-6.283a.42.42 0 0 0-.409.428v3.672L45.483 13.83l-6.728-7.034c-.135-.143-.366-.065-.397.132l-.654 4.111a.25.25 0 0 0 .066.214l3.428 3.585L4.002 53.726 2.408 63.983l9.451-1.748 37.336-39.036 3.646 3.812a.23.23 0 0 0 .205.069l3.931-.684c.188-.031.263-.274.128-.415l-6.854-7.166L59.41 7.442h3.799a.42.42 0 0 0 .409-.428V.444a.42.42 0 0 0-.409-.427"/>
    </svg>
  );
}

function TankIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 2C15.5 2 2 15.5 2 32s13.5 30 30 30 30-13.5 30-30S48.5 2 32 2zm0 54C17.7 56 6 44.3 6 30S17.7 4 32 4s26 11.7 26 26-11.7 26-26 26z"/>
      <path d="M32 12c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"/>
      <circle cx="32" cy="32" r="8"/>
    </svg>
  );
}

function HealerIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor">
      <path d="M52 26H38V12c0-3.3-2.7-6-6-6s-6 2.7-6 6v14H12c-3.3 0-6 2.7-6 6s2.7 6 6 6h14v14c0 3.3 2.7 6 6 6s6-2.7 6-6V38h14c3.3 0 6-2.7 6-6s-2.7-6-6-6z"/>
    </svg>
  );
}

function DPSIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor">
      <path d="M62 2L46 18l-8-8L22 26l8 8-20 20-8-8v24h24l-8-8 20-20 8 8 16-16-8-8L62 2z"/>
    </svg>
  );
}

function App() {
  const [selectedClass, setSelectedClass] = useState('All');
  const [sortBy, setSortBy] = useState('favorites');
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [characterData, setCharacterData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const classCounts = useMemo(() => {
    const counts = {};
    allCharacters.forEach(char => {
      counts[char.class] = (counts[char.class] || 0) + 1;
    });
    return counts;
  }, []);

  const classList = useMemo(() => {
    return Object.keys(classColors).sort();
  }, []);

  // Fetch character data from API
  const fetchCharacterData = async (character) => {
    try {
      const response = await fetch(`/api/char?realm=${character.realm}&name=${character.name}`);
      if (!response.ok) {
        console.error(`Failed to fetch data for ${character.name}`);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${character.name}:`, error);
      return null;
    }
  };

  // Load all character data on mount
  React.useEffect(() => {
    const loadAllCharacterData = async () => {
      // Check for cached data
      const cachedData = localStorage.getItem('wowCharacterData');
      const cacheTimestamp = localStorage.getItem('wowCharacterDataTimestamp');
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      // Use cache if less than 1 hour old
      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < oneHour) {
        setCharacterData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // Otherwise fetch fresh data
      setLoading(true);
      const data = {};
      
      for (let i = 0; i < allCharacters.length; i++) {
        const character = allCharacters[i];
        const apiData = await fetchCharacterData(character);
        if (apiData) {
          data[character.id] = apiData;
        }
        setLoadingProgress(Math.round(((i + 1) / allCharacters.length) * 100));
      }
      
      // Cache the data
      localStorage.setItem('wowCharacterData', JSON.stringify(data));
      localStorage.setItem('wowCharacterDataTimestamp', now.toString());
      
      setCharacterData(data);
      setLoading(false);
    };

    loadAllCharacterData();
  }, []);

  const filteredCharacters = useMemo(() => {
    let result = [...allCharacters];
    
    if (selectedClass !== 'All') {
      result = result.filter(char => char.class === selectedClass);
    }
    
    if (sortBy === 'favorites') {
      result.sort((a, b) => a.favoriteRank - b.favoriteRank);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'class') {
      result.sort((a, b) => a.class.localeCompare(b.class));
    } else if (sortBy === 'ilvl') {
      result.sort((a, b) => {
        const ilvlA = characterData[a.id]?.itemLevel || 0;
        const ilvlB = characterData[b.id]?.itemLevel || 0;
        return ilvlB - ilvlA; // Highest first
      });
    } else if (sortBy === 'role') {
      result.sort((a, b) => {
        const roleA = characterData[a.id]?.role || 'DPS';
        const roleB = characterData[b.id]?.role || 'DPS';
        const roleOrder = { 'Tank': 0, 'Healer': 1, 'DPS': 2 };
        return roleOrder[roleA] - roleOrder[roleB];
      });
    }
    
    return result;
  }, [selectedClass, sortBy, characterData]);

  const toggleCardFlip = (id) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Tank':
        return <TankIcon size={24} />;
      case 'Healer':
        return <HealerIcon size={24} />;
      case 'DPS':
      default:
        return <DPSIcon size={24} />;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const refreshCharacterData = () => {
    localStorage.removeItem('wowCharacterData');
    localStorage.removeItem('wowCharacterDataTimestamp');
    window.location.reload();
  };

  return (
    <div className="app-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h2>Loading Character Data...</h2>
            <div className="loading-bar">
              <div className="loading-progress" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <p>{loadingProgress}% Complete</p>
          </div>
        </div>
      )}

      <div className="header">
        <h1 className="title">Midnight Preparation</h1>
        <p className="subtitle">
          Max Level Characters: {filteredCharacters.length} {selectedClass !== 'All' && `(${allCharacters.length} total)`}
        </p>
      </div>

      <div className="filter-container">
        <div className="sort-control-container">
          <label htmlFor="sort-select" className="sort-label">Sort By:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="favorites">Favorites (1-24)</option>
            <option value="name">Name (A-Z)</option>
            <option value="class">Class (A-Z)</option>
            <option value="ilvl">Item Level (High to Low)</option>
            <option value="role">Role (Tank/Healer/DPS)</option>
          </select>
        </div>
        
        <div className="filter-buttons">
          <button
            onClick={() => setSelectedClass('All')}
            className={`filter-btn ${selectedClass === 'All' ? 'active' : ''}`}
          >
            All [{allCharacters.length}]
          </button>
          {classList.map(className => (
            <button
              key={className}
              onClick={() => setSelectedClass(className)}
              className={`filter-btn class-filter ${selectedClass === className ? 'active' : ''}`}
              style={{
                '--class-border': classColors[className].border,
                '--class-bg': classColors[className].bg
              }}
            >
              {className} [{classCounts[className] || 0}]
            </button>
          ))}
        </div>
      </div>

      <div className="character-grid">
        {filteredCharacters.map((character) => {
          const isFlipped = flippedCards.has(character.id);
          const apiData = characterData[character.id];
          
          return (
            <div
              key={character.id}
              onClick={() => toggleCardFlip(character.id)}
              className="card-container"
            >
              <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                {/* Front of Card - Close-up face */}
                <div className="card-face card-front">
                  <div 
                    className="card-inner"
                    style={{ borderColor: classColors[character.class].border }}
                  >
                    <div className="card-image-container">
                      <img
                        src={character.faceImage}
                        alt={`${character.name} close-up`}
                        className="card-image"
                      />
                    </div>
                    <div 
                      className="card-info"
                      style={{ backgroundColor: classColors[character.class].bg }}
                    >
                      <h3 className="character-name">{character.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Back of Card - Full body with info */}
                <div className="card-face card-back">
                  <div 
                    className="card-inner"
                    style={{ borderColor: classColors[character.class].border }}
                  >
                    <div className="card-image-container full-height">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="card-image"
                      />
                      {apiData?.itemLevel && (
                        <div className="ilvl-badge">
                          <SwordsIcon size={16} />
                          {apiData.itemLevel}
                        </div>
                      )}
                      {apiData && (
                        <div className="card-overlay-info">
                          <div className="overlay-stat">
                            <span className="stat-label">Role:</span>
                            <span className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {getRoleIcon(apiData.role)}
                              {apiData.role}
                            </span>
                          </div>
                          {apiData.professions && apiData.professions.length > 0 && (
                            <div className="overlay-stat">
                              <span className="stat-label">Professions:</span>
                              <span className="stat-value">
                                {apiData.professions.map(p => p.name).join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {flippedCards.size > 0 && (
        <div className="reset-container">
          <button
            onClick={() => setFlippedCards(new Set())}
            className="reset-btn"
          >
            <RotateCcw size={20} />
            Reset All Cards
          </button>
        </div>
      )}

      <div className="instructions">
        <p>Click any card to flip and see character close-up • Filter by class to view specific characters</p>
      </div>
    </div>
  );
}

export default App;