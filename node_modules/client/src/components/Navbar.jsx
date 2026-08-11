import React from 'react';
import { Sprout, Globe, Volume2, Square, MapPin, ShieldAlert } from 'lucide-react';

export default function Navbar({ 
  currentLang, 
  onToggleLang, 
  activeTab, 
  onSelectTab, 
  locationName, 
  isSpeakingAudio, 
  onToggleAudio 
}) {
  const isTe = currentLang === 'te';

  return (
    <header style={{ width: '100%' }}>
      <nav className="navbar">
        <div className="nav-content">
          <div className="brand-section">
            <div className="brand-icon">
              <Sprout size={28} color="#ffffff" />
            </div>
            <div>
              <h1 className="brand-title">
                {isTe ? "అగ్రి-AI" : "Agri-AI"}
              </h1>
              <div className="brand-tagline">
                {isTe ? "రైతుల పంట ఆరోగ్యం & వాతావరణ ఆధారిత సలహాలు" : "AI Crop Health, Weather & Smart Action Advisory"}
              </div>
            </div>
          </div>

          <div className="nav-actions">
            {locationName && (
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <MapPin size={16} color="#4ade80" />
                <span>{locationName}</span>
              </div>
            )}

            <button 
              className={`audio-btn ${isSpeakingAudio ? 'playing' : ''}`}
              onClick={onToggleAudio}
              title={isTe ? "వాయిస్ సహాయం వినండి" : "Listen to Voice Advisory"}
            >
              {isSpeakingAudio ? <Square size={16} /> : <Volume2 size={16} />}
              <span>{isSpeakingAudio ? (isTe ? "ఆపు" : "Stop Voice") : (isTe ? "వాయిస్" : "Listen Voice")}</span>
            </button>

            <button className="lang-btn" onClick={onToggleLang}>
              <Globe size={16} />
              <span>{isTe ? "English" : "తెలుగు"}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="tabs-bar">
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'diagnose' ? 'active' : ''}`}
            onClick={() => onSelectTab('diagnose')}
          >
            📸 {isTe ? "పంట నిర్ధారణ" : "Crop Diagnosis"}
          </button>

          <button 
            className={`tab-button ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => onSelectTab('weather')}
          >
            🌤️ {isTe ? "వాతావరణం" : "Live Weather"}
          </button>

          <button 
            className={`tab-button ${activeTab === 'advisory' ? 'active' : ''}`}
            onClick={() => onSelectTab('advisory')}
          >
            🛡️ {isTe ? "స్మార్ట్ సలహాలు" : "Smart Advisory"}
          </button>

          <button 
            className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => onSelectTab('schedule')}
          >
            ⏱️ {isTe ? "ఉత్తమ సమయం" : "Best Time to Act"}
          </button>

          <button 
            className={`tab-button ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => onSelectTab('catalog')}
          >
            📚 {isTe ? "తెగుళ్ల గ్రంథాలయం" : "Disease Library"}
          </button>

          <button 
            className={`tab-button ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => onSelectTab('export')}
          >
            📄 {isTe ? "ప్రింట్ నివేదిక" : "Export Summary"}
          </button>
        </div>
      </div>
    </header>
  );
}
