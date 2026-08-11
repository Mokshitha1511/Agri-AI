import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function BestTimeToAct({ currentLang, schedule }) {
  if (!schedule || schedule.length === 0) return null;

  const isTe = currentLang === 'te';

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Clock size={22} color="#d97706" />
          <span>{isTe ? "మందుల పిచికారీకి ఉత్తమ సమయం షెడ్యూల్" : "Best Time to Act Action Schedule"}</span>
        </h2>

        <span className="badge badge-info">
          3-Day Action Timing Window
        </span>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        {isTe 
          ? "రాబోయే 3 రోజుల వాతావరణం, వర్షం మరియు గాలి వేగాన్ని బట్టి పిచికారీ చేయడానికి అత్యంత అనుకూలమైన సమయాలు క్రింద ఇవ్వబడ్డాయి:" 
          : "Based on upcoming rain, wind speed, and thermal stress, here are the safest 3-hour spray windows for your field:"}
      </p>

      {schedule.map((dayData) => (
        <div key={dayData.dayIndex} className="schedule-day-card">
          <div className="schedule-day-header">
            📅 {dayData.dayLabel}
          </div>

          <div className="slot-grid">
            {dayData.slots.map((slot) => (
              <div 
                key={slot.id} 
                className="slot-item"
                style={{
                  borderLeft: `4px solid ${slot.status === 'BEST' ? '#059669' : (slot.status === 'CAUTION' ? '#d97706' : '#dc2626')}`,
                  background: slot.status === 'AVOID' ? '#fff5f5' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div className="slot-time">
                    {isTe ? slot.timeSlotTelugu : slot.timeSlot}
                  </div>
                  <span className={`badge ${slot.badgeClass}`}>
                    {slot.status === 'BEST' && <CheckCircle size={12} />}
                    {slot.status === 'AVOID' && <XCircle size={12} />}
                    <span>{isTe ? slot.statusTelugu : slot.status}</span>
                  </span>
                </div>

                <div className="slot-metrics">
                  <span>🌡️ {slot.temp}°C</span>
                  <span>🌧️ {slot.rainProbability}% {isTe ? "వర్షం" : "Rain"}</span>
                  <span>💨 {slot.windSpeed} km/h</span>
                </div>

                <div style={{ fontSize: '0.78rem', color: slot.status === 'AVOID' ? '#991b1b' : 'var(--text-muted)' }}>
                  {isTe ? slot.reasonTelugu : slot.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
