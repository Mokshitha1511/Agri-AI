import React from 'react';
import { ShieldCheck, AlertTriangle, Leaf, FlaskConical, Shield, CloudRain, Wind, Sun, Droplets } from 'lucide-react';

export default function AdvisoryCard({ currentLang, advisory }) {
  if (!advisory) return null;

  const isTe = currentLang === 'te';

  const getSuitabilityColor = (status) => {
    if (status === 'UNSUITABLE_NOW') return '#dc2626';
    if (status === 'CAUTION_REQUIRED') return '#d97706';
    return '#059669';
  };

  const getHazardIcon = (iconName) => {
    switch (iconName) {
      case 'cloud-rain': return <CloudRain size={20} color="#dc2626" />;
      case 'wind': return <Wind size={20} color="#dc2626" />;
      case 'sun': return <Sun size={20} color="#d97706" />;
      default: return <Droplets size={20} color="#0284c7" />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <ShieldCheck size={22} color="#059669" />
          <span>{isTe ? "వాతావరణ ఆధారిత స్మార్ట్ పంట సలహాలు" : "Weather-Aware Integrated Advisory"}</span>
        </h2>

        <span className={`badge ${advisory.spraySuitability === 'UNSUITABLE_NOW' ? 'badge-danger' : (advisory.spraySuitability === 'CAUTION_REQUIRED' ? 'badge-warning' : 'badge-success')}`}>
          {isTe ? advisory.spraySuitabilityTelugu : advisory.spraySuitability.replace('_', ' ')}
        </span>
      </div>

      {/* Immediate Hazard Warnings */}
      {advisory.warnings && advisory.warnings.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={18} color="#dc2626" />
            <span>{isTe ? "వాతావరణ ముప్పు ప్రమాద హెచ్చరికలు:" : "Immediate Weather Safety Hazards:"}</span>
          </h4>

          {advisory.warnings.map((warn, wIdx) => (
            <div key={wIdx} className={`hazard-alert ${warn.severity}`}>
              <div>
                {getHazardIcon(warn.icon)}
              </div>
              <div>
                <div className="hazard-title">
                  {isTe ? warn.titleTelugu : warn.title}
                </div>
                <div className="hazard-desc">
                  {isTe ? warn.messageTelugu : warn.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Immediate Guidance Banner */}
      <div style={{
        background: advisory.spraySuitability === 'UNSUITABLE_NOW' ? '#fee2e2' : '#d1fae5',
        borderLeft: `5px solid ${getSuitabilityColor(advisory.spraySuitability)}`,
        padding: '1.1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        lineHeight: 1.5
      }}>
        <div style={{ fontWeight: 700, fontSize: '1rem', color: getSuitabilityColor(advisory.spraySuitability), marginBottom: '0.3rem' }}>
          📌 {isTe ? "రైతుకు అత్యంత ముఖ్యమైన సూచన:" : "Key Action Directive:"}
        </div>
        <div style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
          {isTe ? advisory.immediateGuidanceTelugu : advisory.immediateGuidance}
        </div>
      </div>

      {/* Organic Remedies Box */}
      <div className="remedy-box">
        <div className="remedy-header">
          <Leaf size={20} color="#059669" />
          <span>{isTe ? "1. సేంద్రీయ & ప్రకృతి నివారణ పద్ధతులు:" : "1. Eco-Friendly & Organic Remedies:"}</span>
        </div>
        <ul className="remedy-list">
          {(isTe ? advisory.organicPlanTelugu : advisory.organicPlan).map((item, oIdx) => (
            <li key={oIdx} className="remedy-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Chemical Remedies Box */}
      <div className="remedy-box">
        <div className="remedy-header">
          <FlaskConical size={20} color="#0284c7" />
          <span>{isTe ? "2. రసాయన మందుల వాడకం (పరిమాణంతో):" : "2. Recommended Chemical Control & Dosage:"}</span>
        </div>
        <ul className="remedy-list">
          {(isTe ? advisory.chemicalPlanTelugu : advisory.chemicalPlan).map((item, cIdx) => (
            <li key={cIdx} className="remedy-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Preventive Measures Box */}
      <div className="remedy-box">
        <div className="remedy-header">
          <Shield size={20} color="#d97706" />
          <span>{isTe ? "3. ముందు జాగ్రత్త & సేద్యపు చర్యలు:" : "3. Long-Term Prevention & Cultural Practices:"}</span>
        </div>
        <ul className="remedy-list">
          {(isTe ? advisory.preventiveStepsTelugu : advisory.preventiveSteps).map((item, pIdx) => (
            <li key={pIdx} className="remedy-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
