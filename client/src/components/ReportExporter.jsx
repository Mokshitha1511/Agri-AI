import React from 'react';
import { Printer, Download, Sprout, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ReportExporter({ currentLang, diagnosis, weather, advisory }) {
  const isTe = currentLang === 'te';

  if (!diagnosis || !weather || !advisory) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p>{isTe ? "ప్రింట్ నివేదిక సృష్టించడానికి దయచేసి పంట ఆకును విశ్లేషించండి." : "Please diagnose a crop leaf to generate your printable report."}</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Printer size={22} color="#059669" />
          <span>{isTe ? "రైతు క్షేత్ర స్థాయి నివేదిక" : "Farmer Field Advisory Report"}</span>
        </h2>

        <button type="button" className="btn-primary" onClick={handlePrint}>
          <Printer size={16} />
          <span>{isTe ? "ప్రింట్ / డౌన్‌లోడ్ నివేదిక" : "Print Report"}</span>
        </button>
      </div>

      <div style={{
        background: '#ffffff',
        border: '2px solid var(--primary-700)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '1rem'
      }}>
        {/* Header Branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#064e3b', fontWeight: 800 }}>
              🌾 AGRI-AI FIELD ADVISORY
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              {isTe ? "పంట ఆరోగ్య నివేదిక మరియు స్మార్ట్ నివారణల పత్రం" : "Official Field Diagnosis & Smart Action Plan"}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6b7280' }}>
            <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
            <div><strong>Location:</strong> {weather.locationName}</div>
          </div>
        </div>

        {/* Diagnosis & Weather Summary Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ background: '#f8faf8', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ color: '#064e3b', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              🔍 {isTe ? "పంట నిర్ధారణ:" : "Crop Diagnosis:"}
            </h4>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              {isTe ? diagnosis.diseaseNameTelugu : diagnosis.diseaseName}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              Crop: <strong>{diagnosis.crop}</strong> ({diagnosis.cropTelugu})
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              Severity: <strong>{diagnosis.severity}</strong> ({diagnosis.affectedLeafAreaPercent}% leaf area)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
              AI Confidence: {diagnosis.confidenceScore}%
            </div>
          </div>

          <div style={{ background: '#f8faf8', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ color: '#0284c7', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              🌤️ {isTe ? "క్షేత్ర వాతావరణం:" : "Field Weather Conditions:"}
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#111827' }}>
              Temperature: <strong>{weather.temperature}°C</strong> ({weather.conditionText})
            </div>
            <div style={{ fontSize: '0.85rem', color: '#111827' }}>
              Humidity: <strong>{weather.humidity}%</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#111827' }}>
              Rain Chance: <strong>{weather.rainProbabilityCurrent}%</strong> (Next 6h Max: {weather.next6HoursRainMax}%)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#111827' }}>
              Wind Speed: <strong>{weather.windSpeed} km/h</strong>
            </div>
          </div>
        </div>

        {/* Action Directives */}
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
          <h4 style={{ color: '#065f46', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
            📌 {isTe ? "రైతు అత్యవసర చర్యలు:" : "Action Directive for Farmer:"}
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#064e3b', fontWeight: 600 }}>
            {isTe ? advisory.immediateGuidanceTelugu : advisory.immediateGuidance}
          </p>
        </div>

        {/* Remedies Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px' }}>
            <h5 style={{ color: '#059669', marginBottom: '0.5rem' }}>🌿 {isTe ? "సేంద్రీయ నివారణ:" : "Organic Remedy:"}</h5>
            <div style={{ fontSize: '0.85rem', color: '#374151' }}>
              {isTe ? advisory.organicPlanTelugu[0] : advisory.organicPlan[0]}
            </div>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px' }}>
            <h5 style={{ color: '#0284c7', marginBottom: '0.5rem' }}>🧪 {isTe ? "రసాయన నివారణ:" : "Chemical Remedy:"}</h5>
            <div style={{ fontSize: '0.85rem', color: '#374151' }}>
              {isTe ? advisory.chemicalPlanTelugu[0] : advisory.chemicalPlan[0]}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
          {isTe 
            ? "ఈ నివేదిక కృత్రిమ మేధస్సు (AI) మరియు ప్రత్యక్ష వాతావరణ సమాచారం ఆధారంగా తయారుచేయబడింది. స్థానిక వ్యవసాయ అధికారి లేదా ఎరువుల దుకాణంలో చూపించి సహకారం పొందవచ్చు."
            : "Generated by Agri-AI Weather-Aware Crop Diagnostic Engine. Recommended to present to local Krishi Vigyan Kendra or Extension Officer."}
        </div>
      </div>
    </div>
  );
}
