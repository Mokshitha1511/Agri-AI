import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Eye, Sparkles, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

const SAMPLES = [
  {
    id: 'tomato_early_blight',
    name: 'Tomato Early Blight',
    nameTelugu: 'టమాటో అర్లీ బ్లైట్',
    img: '/sample-leaves/tomato_early_blight.png'
  },
  {
    id: 'potato_late_blight',
    name: 'Potato Late Blight',
    nameTelugu: 'బంగాళాదుంప లేట్ బ్లైట్',
    img: '/sample-leaves/potato_late_blight.png'
  },
  {
    id: 'rice_leaf_blast',
    name: 'Rice Leaf Blast',
    nameTelugu: 'వరి అగ్గి తెగులు',
    img: '/sample-leaves/rice_leaf_blast.png'
  },
  {
    id: 'healthy_crop',
    name: 'Healthy Crop Leaf',
    nameTelugu: 'ఆరోగ్యకరమైన ఆకు',
    img: '/sample-leaves/healthy_crop_leaf.png'
  }
];

export default function LeafDiagnoser({ currentLang, onDiagnose, isDiagnosing, activeDiagnosis }) {
  const isTe = currentLang === 'te';
  const [selectedImage, setSelectedImage] = useState('/sample-leaves/tomato_early_blight.png');
  const [selectedSampleId, setSelectedSampleId] = useState('tomato_early_blight');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Trigger initial diagnosis on sample load
  useEffect(() => {
    onDiagnose(selectedImage, selectedSampleId);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setSelectedImage(base64);
        setSelectedSampleId('custom');
        onDiagnose(base64, 'custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleClick = (sample) => {
    setSelectedImage(sample.img);
    setSelectedSampleId(sample.id);
    onDiagnose(sample.img, sample.id);
  };

  // Draw Lesion Heatmap Overlay on Canvas if heatmapSpots exist
  useEffect(() => {
    if (!canvasRef.current || !activeDiagnosis || !showHeatmap) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (activeDiagnosis.heatmapSpots && activeDiagnosis.heatmapSpots.length > 0) {
      activeDiagnosis.heatmapSpots.forEach(spot => {
        const cx = (spot.x / 100) * canvas.width;
        const cy = (spot.y / 100) * canvas.height;
        const radius = (spot.radius / 100) * Math.min(canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(239, 68, 68, ${spot.intensity || 0.7})`);
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${(spot.intensity || 0.7) * 0.6})`);
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, [selectedImage, activeDiagnosis, showHeatmap]);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Sparkles size={22} color="#059669" />
          <span>{isTe ? "పంట ఆకు తెగులు నిర్ధారణ" : "AI Crop Disease Leaf Diagnosis"}</span>
        </h2>
        {isDiagnosing && (
          <span style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <RefreshCw size={16} className="spin" />
            {isTe ? "విశ్లేషిస్తోంది..." : "Analyzing..."}
          </span>
        )}
      </div>

      <div 
        className="dropzone"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />
        
        <Upload className="dropzone-icon" />
        <div className="dropzone-title">
          {isTe ? "తెగులు సోకిన ఆకు ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి" : "Upload diseased crop leaf photo"}
        </div>
        <div className="dropzone-sub">
          {isTe ? "కంప్యూటర్ లేదా మొబైల్ గ్యాలరీ నుండి ఎంచుకోండి" : "Click to browse or drag & drop leaf image"}
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button 
            type="button"
            className="btn-secondary" 
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            <Camera size={16} />
            <span>{isTe ? "కెమెరా తెరవండి" : "Take Photo"}</span>
          </button>
        </div>
      </div>

      <div className="samples-headline">
        {isTe ? "లేదా ఈ క్రింది నమూనా ఆకులతో ప్రయత్నించండి:" : "Or select a sample leaf for demonstration:"}
      </div>

      <div className="sample-grid">
        {SAMPLES.map(sample => (
          <div 
            key={sample.id}
            className={`sample-chip ${selectedSampleId === sample.id ? 'selected' : ''}`}
            onClick={() => handleSampleClick(sample)}
          >
            <img src={sample.img} alt={sample.name} className="sample-img" />
            <div className="sample-label">
              {isTe ? sample.nameTelugu : sample.name}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="preview-container">
            <img src={selectedImage} alt="Selected Crop Leaf" className="preview-img" />
            
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={380} 
              className="heatmap-canvas" 
            />

            {activeDiagnosis && activeDiagnosis.heatmapSpots?.length > 0 && (
              <button 
                type="button" 
                className="heatmap-toggle-btn" 
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                <Eye size={14} />
                <span>{showHeatmap ? (isTe ? "హీట్‌మ్యాప్ దాచు" : "Hide Heatmap") : (isTe ? "మచ్చల హీట్‌మ్యాప్ చూడు" : "Show Heatmap Overlay")}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
