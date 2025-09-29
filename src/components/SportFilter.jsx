import React from 'react';

const SportFilter = ({ selectedSport, onSportChange, sports }) => {
  return (
    <div className="sport-filter">
      <select
        value={selectedSport}
        onChange={(e) => onSportChange(e.target.value)}
        className="sport-select"
      >
        <option value="">All Sports</option>
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportFilter;
