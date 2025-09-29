import React, { useState, useEffect, useMemo } from 'react';
import { apiService } from './services/api';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import LeagueCard from './components/LeagueCard';
import './App.css';

function App() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  // Fetch leagues on component mount
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const leaguesData = await apiService.getAllLeagues();
        setLeagues(leaguesData);
      } catch (err) {
        setError('Failed to load leagues. Please try again later.');
        console.error('Error fetching leagues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // Get unique sports for the filter dropdown
  const uniqueSports = useMemo(() => {
    const sports = [...new Set(leagues.map(league => league.strSport))];
    return sports.filter(sport => sport).sort();
  }, [leagues]);

  // Filter leagues based on search term and selected sport
  const filteredLeagues = useMemo(() => {
    return leagues.filter(league => {
      const matchesSearch = !searchTerm || 
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (league.strLeagueAlternate && league.strLeagueAlternate.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSport = !selectedSport || league.strSport === selectedSport;
      
      return matchesSearch && matchesSport;
    });
  }, [leagues, searchTerm, selectedSport]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading sports leagues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <div className="trophy-icon">🏆</div>
            <h1>Sports Leagues</h1>
          </div>
          <div className="leagues-sidebar">
            <div className="sidebar-header">
              <div className="trophy-small">🏆</div>
              <span>Leagues</span>
            </div>
            <div className="sidebar-item active">
              📋 All Leagues
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="filters-container">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search leagues by name..."
          />
          <SportFilter 
            selectedSport={selectedSport}
            onSportChange={setSelectedSport}
            sports={uniqueSports}
          />
        </div>

        <div className="status-filters">
          <button className="status-btn active">
            ✅ Active
          </button>
          <button className="status-btn">
            📅 2024 Season
          </button>
        </div>

        <div className="leagues-info">
          <p>Browse leagues by sport or search by name. Click a card to view details.</p>
        </div>

        <div className="leagues-grid">
          {filteredLeagues.length === 0 ? (
            <div className="no-results">
              <p>No leagues found matching your criteria.</p>
              {(searchTerm || selectedSport) && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSport('');
                  }}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredLeagues.map((league) => (
              <LeagueCard key={league.idLeague} league={league} />
            ))
          )}
        </div>

        <div className="results-info">
          <p>Showing {filteredLeagues.length} of {leagues.length} leagues</p>
        </div>
      </main>
    </div>
  );
}

export default App;
