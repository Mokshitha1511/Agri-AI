import React from 'react';
import { ShieldAlert, CheckCircle2, AlertOctagon, Activity, FileText, Bug } from 'lucide-react';

export default function DiagnosisResult({ currentLang, diagnosis }) {
  if (!diagnosis) return null;

  const isTe = currentLang === 'te';
  const isHealthy = diagnosis.diseaseId === 'healthy_crop';

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'High':
      case 'Severe':
        return 'badge-danger';
      case 'Moderate':
        return 'badge-warning';
      case 'Healthy':
        return 'badge-success';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="card">
      <div className="result-header-box" style={{
        background: isHealthy 
          ? 'linear-gradient(135deg, #065f46, #047857)' 
          : 'linear-gradient(135deg, #991b1b, #b91c1c)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.9, fontWeight: 700 }}>
              {isTe ? diagnosis.cropTelugu : diagnosis.crop} • {isTe ? diagnosis.pathogenTypeTelugu : diagnosis.pathogenType}
            </div>
            <h3 className="disease-title-main">
              {diagnosis.diseaseName}
            </h3>
            <div className="disease-sub-telugu">
              {diagnosis.diseaseNameTelugu}
            </div>
          </div>

          <div className="badge-row">
            <span className={`badge ${getSeverityBadgeClass(diagnosis.severity)}`}>
              {isHealthy ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
              <span>{isTe ? (isHealthy ? "ఆరోగ్యకరం" : `తీవ్రత: ${diagnosis.severity}`) : `Severity: ${diagnosis.severity}`}</span>
            </span>

            <span className="badge badge-info">
              <Activity size={14} />
              <span>{diagnosis.confidenceScore}% {isTe ? "ఖచ్చితత్వం" : "Confidence"}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-box">
          <div className="metric-val" style={{ color: isHealthy ? '#059669' : '#dc2626' }}>
            {diagnosis.confidenceScore}%
          </div>
          <div className="metric-lbl">
            {isTe ? "AI నమూనా విశ్వసనీయత" : "Model Confidence"}
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-val" style={{ color: diagnosis.affectedLeafAreaPercent > 25 ? '#dc2626' : '#d97706' }}>
            {diagnosis.affectedLeafAreaPercent}%
          </div>
          <div className="metric-lbl">
            {isTe ? "దెబ్బతిన్న ఆకు వైశాల్యం" : "Leaf Area Damaged"}
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-val" style={{ color: '#0284c7' }}>
            {diagnosis.pathogenType}
          </div>
          <div className="metric-lbl">
            {isTe ? "తెగులు వర్గం" : "Pathogen Category"}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <FileText size={16} />
          <span>{isTe ? "వివరణ:" : "Disease Overview:"}</span>
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          {isTe ? diagnosis.descriptionTelugu : diagnosis.description}
        </p>
      </div>

      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Bug size={16} />
          <span>{isTe ? "ప్రధాన తెగులు లక్షణాలు:" : "Key Field Symptoms:"}</span>
        </h4>
        <ul className="remedy-list">
          {(isTe ? diagnosis.symptomsTelugu : diagnosis.symptoms).map((symptom, idx) => (
            <li key={idx} className="remedy-item">
              {symptom}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
