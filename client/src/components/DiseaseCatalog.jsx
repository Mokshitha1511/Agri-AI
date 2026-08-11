import React, { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';

export default function DiseaseCatalog({ currentLang, diseases = [] }) {
  const isTe = currentLang === 'te';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');

  const filteredDiseases = diseases.filter(item => {
    const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesQuery = !q || 
      item.diseaseName.toLowerCase().includes(q) || 
      item.diseaseNameTelugu?.includes(q) ||
      item.crop.toLowerCase().includes(q) ||
      item.cropTelugu?.includes(q);
    return matchesCrop && matchesQuery;
  });

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <BookOpen size={22} color="#059669" />
          <span>{isTe ? "రైతు పంట తెగుళ్ల గ్రంథాలయం" : "Crop Disease Knowledge Library"}</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            className="weather-input"
            style={{ paddingLeft: '36px' }}
            placeholder={isTe ? "పంట లేదా తెగులు పేరు శోధించండి..." : "Search by crop or disease name..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
          {['All', 'Tomato', 'Potato', 'Rice', 'Corn', 'Cotton'].map(crop => (
            <button
              key={crop}
              type="button"
              className={`loc-chip ${selectedCrop === crop ? 'active' : ''}`}
              style={{
                background: selectedCrop === crop ? 'var(--primary-700)' : 'var(--bg-subtle)',
                color: selectedCrop === crop ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.8rem'
              }}
              onClick={() => setSelectedCrop(crop)}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredDiseases.map((d) => (
          <div key={d.id} className="card" style={{ padding: '1.25rem', margin: 0, background: 'var(--bg-subtle)' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--primary-700)', fontWeight: 700 }}>
              {isTe ? d.cropTelugu : d.crop} • {d.pathogenType}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.2rem 0' }}>
              {d.diseaseName}
            </h3>
            <div style={{ fontSize: '0.95rem', color: '#059669', fontWeight: 600, marginBottom: '0.75rem' }}>
              {d.diseaseNameTelugu}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
              {isTe ? d.descriptionTelugu : d.description}
            </p>

            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.3rem' }}>
                🧪 {isTe ? "సిఫార్సు చేసిన నివారణ:" : "Primary Treatment:"}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                {isTe ? d.chemicalRemediesTelugu[0] : d.chemicalRemedies[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
