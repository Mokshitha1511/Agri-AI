import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LeafDiagnoser from './components/LeafDiagnoser';
import DiagnosisResult from './components/DiagnosisResult';
import WeatherDashboard from './components/WeatherDashboard';
import AdvisoryCard from './components/AdvisoryCard';
import BestTimeToAct from './components/BestTimeToAct';
import DiseaseCatalog from './components/DiseaseCatalog';
import ReportExporter from './components/ReportExporter';

import { 
  diagnoseImage, 
  fetchWeather, 
  fetchAdvisory, 
  fetchDiseaseCatalog 
} from './utils/api';
import { speakText, stopSpeaking, isSpeaking } from './utils/textToSpeech';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en'); // 'en' or 'te'
  const [activeTab, setActiveTab] = useState('diagnose');
  
  const [diagnosis, setDiagnosis] = useState(null);
  const [weather, setWeather] = useState(null);
  const [advisory, setAdvisory] = useState(null);
  const [diseases, setDiseases] = useState([]);
  
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);

  // Load initial weather and disease catalog on app mount
  useEffect(() => {
    loadDefaultWeather();
    loadDiseaseCatalog();
  }, []);

  // Update advisory whenever diagnosis or weather updates
  useEffect(() => {
    if (diagnosis && weather) {
      loadAdvisory(diagnosis, weather);
    }
  }, [diagnosis, weather]);

  const loadDefaultWeather = async (query = 'Guntur', lat = null, lon = null) => {
    try {
      const data = await fetchWeather(lat, lon, query);
      setWeather(data);
    } catch (err) {
      console.error("Failed to load weather:", err);
    }
  };

  const loadDiseaseCatalog = async () => {
    try {
      const list = await fetchDiseaseCatalog();
      setDiseases(list);
    } catch (err) {
      console.error("Failed to load diseases catalog:", err);
    }
  };

  const loadAdvisory = async (diag, weat) => {
    try {
      const adv = await fetchAdvisory(diag, weat);
      setAdvisory(adv);
    } catch (err) {
      console.error("Failed to load advisory:", err);
    }
  };

  const handleDiagnose = async (imagePayload, sampleId) => {
    setIsDiagnosing(true);
    try {
      const result = await diagnoseImage(imagePayload, sampleId);
      setDiagnosis(result);
    } catch (err) {
      console.error("Diagnosis error:", err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleSearchWeather = async (query) => {
    try {
      const data = await fetchWeather(null, null, query);
      setWeather(data);
    } catch (err) {
      console.error("Weather search error:", err);
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeather(latitude, longitude, null);
            setWeather(data);
          } catch (err) {
            console.error("Geolocation weather fetch failed:", err);
          }
        },
        (error) => {
          alert("Could not detect location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleToggleLang = () => {
    setCurrentLang(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const handleToggleAudio = () => {
    if (isSpeakingAudio || isSpeaking()) {
      stopSpeaking();
      setIsSpeakingAudio(false);
      return;
    }

    if (!diagnosis || !weather || !advisory) {
      alert(currentLang === 'te' ? "వాయిస్ సలహా కోసం ముందుగా ఆకును విశ్లేషించండి." : "Please diagnose a leaf first to generate audio advisory.");
      return;
    }

    let voiceText = "";
    if (currentLang === 'te') {
      voiceText = `నమస్తే రైతు సోదరా! మీ ${diagnosis.cropTelugu} ఆకును పరిశీలించగా ${diagnosis.diseaseNameTelugu} గుర్తించబడింది. విశ్వసనీయత ${diagnosis.confidenceScore} శాతం. ${advisory.immediateGuidanceTelugu} సేంద్రీయ పద్ధతిలో: ${advisory.organicPlanTelugu[0]} రసాయన పద్ధతిలో: ${advisory.chemicalPlanTelugu[0]}`;
    } else {
      voiceText = `Hello farmer! Diagnosis for your ${diagnosis.crop} leaf indicates ${diagnosis.diseaseName} with ${diagnosis.confidenceScore} percent confidence. ${advisory.immediateGuidance} Organic solution: ${advisory.organicPlan[0]} Chemical control: ${advisory.chemicalPlan[0]}`;
    }

    const success = speakText(voiceText, currentLang === 'te' ? 'te-IN' : 'en-US', () => {
      setIsSpeakingAudio(false);
    });

    if (success) {
      setIsSpeakingAudio(true);
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        locationName={weather?.locationName}
        isSpeakingAudio={isSpeakingAudio}
        onToggleAudio={handleToggleAudio}
      />

      <main className="main-content">
        {activeTab === 'diagnose' && (
          <div className="grid-dashboard">
            <LeafDiagnoser 
              currentLang={currentLang}
              onDiagnose={handleDiagnose}
              isDiagnosing={isDiagnosing}
              activeDiagnosis={diagnosis}
            />

            <div>
              <DiagnosisResult 
                currentLang={currentLang}
                diagnosis={diagnosis}
              />

              {advisory && (
                <div style={{ marginTop: '1.5rem' }}>
                  <AdvisoryCard 
                    currentLang={currentLang}
                    advisory={advisory}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <WeatherDashboard 
            currentLang={currentLang}
            weather={weather}
            onSearchWeather={handleSearchWeather}
            onDetectLocation={handleDetectLocation}
          />
        )}

        {activeTab === 'advisory' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AdvisoryCard 
              currentLang={currentLang}
              advisory={advisory}
            />
          </div>
        )}

        {activeTab === 'schedule' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <BestTimeToAct 
              currentLang={currentLang}
              schedule={advisory?.actionSchedule}
            />
          </div>
        )}

        {activeTab === 'catalog' && (
          <DiseaseCatalog 
            currentLang={currentLang}
            diseases={diseases}
          />
        )}

        {activeTab === 'export' && (
          <ReportExporter 
            currentLang={currentLang}
            diagnosis={diagnosis}
            weather={weather}
            advisory={advisory}
          />
        )}
      </main>

      <footer className="footer">
        <div>
          🌾 Agri-AI — AI-Powered Crop Health & Weather-Smart Advisory Engine
        </div>
        <div style={{ marginTop: '0.3rem', fontSize: '0.78rem', opacity: 0.8 }}>
          Empowering farmers with instant leaf diagnosis, real-time weather alerts, and regional Telugu & English guidance.
        </div>
      </footer>
    </div>
  );
}
