import React, { useState } from 'react';
import { apiService } from '../services/api';

const LeagueCard = ({ league }) => {
  const [badgeUrl, setBadgeUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [badgeError, setBadgeError] = useState(null);

  const handleCardClick = async () => {
    if (showBadge && (badgeUrl || badgeError)) {
      // If badge/error is already showing, hide it
      setShowBadge(false);
      return;
    }

    if (badgeUrl) {
      // If badge is cached, just show it
      setShowBadge(true);
      return;
    }

    if (badgeError) {
      // If error is cached, just show it
      setShowBadge(true);
      return;
    }

    // Fetch badge from API
    setIsLoading(true);
    setBadgeError(null);
    try {
      const badge = await apiService.getSeasonBadge(league.idLeague);
      if (badge) {
        setBadgeUrl(badge);
        setShowBadge(true);
      } else {
        setBadgeError(`No season badge available for ${league.strLeague}`);
        setShowBadge(true);
      }
    } catch (error) {
      console.error('Error fetching badge:', error);
      setBadgeError('Failed to load badge. Please try again.');
      setShowBadge(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="league-card" onClick={handleCardClick}>
      <div className="league-info">
        <h3 className="league-name">{league.strLeague}</h3>
        <p className="league-sport">{league.strSport}</p>
        {league.strLeagueAlternate && (
          <p className="league-alternate">{league.strLeagueAlternate}</p>
        )}
      </div>
      
      {isLoading && (
        <div className="badge-loading">Loading badge...</div>
      )}
      
      {showBadge && badgeUrl && (
        <div className="badge-container">
          <img 
            src={badgeUrl} 
            alt={`${league.strLeague} badge`}
            className="league-badge"
            onError={(e) => {
              e.target.style.display = 'none';
              setBadgeError('Failed to load badge image');
              console.log(`Failed to load badge for ${league.strLeague}`);
            }}
          />
        </div>
      )}

      {showBadge && badgeError && (
        <div className="badge-error">
          <div className="error-icon">❌</div>
          <p className="error-message">{badgeError}</p>
        </div>
      )}
      
      <div className="click-hint">
        {!showBadge ? 'Click to view badge' : 'Click to hide'}
      </div>
    </div>
  );
};

export default LeagueCard;
