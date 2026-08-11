import React, { useState } from 'react';
import { Sun, CloudRain, Wind, Droplets, Compass, MapPin, Search, Calendar, Clock } from 'lucide-react';

const QUICK_HUBS = [
  { name: 'Guntur, AP', query: 'Guntur' },
  { name: 'Vijayawada, AP', query: 'Vijayawada' },
  { name: 'Warangal, TS', query: 'Warangal' },
  { name: 'Anantapur, AP', query: 'Anantapur' },
  { name: 'Nizamabad, TS', query: 'Nizamabad' },
  { name: 'Ludhiana, Punjab', query: 'Ludhiana' },
  { name: 'Pune, MH', query: 'Pune' }
];

export default function WeatherDashboard({ currentLang, weather, onSearchWeather, onDetectLocation }) {
  const isTe = currentLang === 'te';
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchWeather(searchInput.trim());
    }
  };

  if (!weather) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Sun size={22} color="#0284c7" />
          <span>{isTe ? "ప్రాంతీయ ప్రత్యక్ష వాతావరణ సమాచారం" : "Live Weather & Field Forecast"}</span>
        </h2>

        <button 
          type="button" 
          className="btn-secondary"
          onClick={onDetectLocation}
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
        >
          <MapPin size={14} color="#059669" />
          <span>{isTe ? "నా స్థానం గురించు" : "Auto Location"}</span>
        </button>
      </div>

      <form onSubmit={handleSearchSubmit} className="weather-search-bar">
        <input 
          type="text" 
          className="weather-input"
          placeholder={isTe ? "గ్రామం/పట్టణం పేరు టైప్ చేయండి (ఉదా: గుంటూరు)" : "Search city/district (e.g., Guntur, Vijayawada)..."}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          <Search size={16} />
          <span>{isTe ? "వెతుకు" : "Search"}</span>
        </button>
      </form>

      <div className="location-chip-row">
        {QUICK_HUBS.map(hub => (
          <div 
            key={hub.query} 
            className="loc-chip"
            onClick={() => {
              setSearchInput(hub.query);
              onSearchWeather(hub.query);
            }}
          >
            {hub.name}
          </div>
        ))}
      </div>

      <div className="weather-current-card">
        <div className="weather-header">
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {weather.locationName}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {weather.conditionText}
            </div>
          </div>
          <div className="temp-large">
            {weather.temperature}°C
          </div>
        </div>

        <div className="weather-stats-grid">
          <div className="w-stat">
            <div className="w-stat-val">{weather.humidity}%</div>
            <div className="w-stat-lbl">{isTe ? "తేమ (హ్యుమిడిటీ)" : "Humidity"}</div>
          </div>
          <div className="w-stat">
            <div className="w-stat-val">{weather.rainProbabilityCurrent}%</div>
            <div className="w-stat-lbl">{isTe ? "వర్షం అవకాశం" : "Rain Prob."}</div>
          </div>
          <div className="w-stat">
            <div className="w-stat-val">{weather.windSpeed} km/h</div>
            <div className="w-stat-lbl">{isTe ? "గాలి వేగం" : "Wind Speed"}</div>
          </div>
          <div className="w-stat">
            <div className="w-stat-val">{weather.uvIndex} / 10</div>
            <div className="w-stat-lbl">{isTe ? "యూవీ రేటింగ్" : "UV Index"}</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={16} />
          <span>{isTe ? "రాబోయే 24 గంటల వాతావరణ సూచిక:" : "Next 24 Hours Hourly Forecast:"}</span>
        </h4>

        <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {weather.hourlyForecast.slice(0, 12).map((item, i) => (
            <div 
              key={i} 
              style={{
                minWidth: '90px',
                background: item.rainProbability > 30 ? '#fee2e2' : 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.6rem 0.4rem',
                textAlign: 'center',
                flexShrink: 0
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {item.hourLabel}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.2rem 0' }}>
                {item.temp}°C
              </div>
              <div style={{ fontSize: '0.72rem', color: item.rainProbability > 30 ? '#dc2626' : '#0284c7', fontWeight: 700 }}>
                🌧️ {item.rainProbability}%
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                💨 {item.windSpeed}k/h
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={16} />
          <span>{isTe ? "7-రోజుల వారపు అంచనా:" : "7-Day Weather Outlook:"}</span>
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
          {weather.dailyForecast.map((day, dIdx) => (
            <div 
              key={dIdx}
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.6rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-900)' }}>
                {day.dayName}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>
                {day.maxTemp}° / {day.minTemp}°
              </div>
              <div style={{ fontSize: '0.75rem', color: day.rainProbability > 40 ? '#dc2626' : 'var(--text-muted)' }}>
                🌧️ {day.rainProbability}% {isTe ? "వర్షం" : "Rain"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
