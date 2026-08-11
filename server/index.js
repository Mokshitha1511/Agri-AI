const express = require('express');
const cors = require('cors');
const path = require('path');

const { diagnoseLeafImage } = require('./services/aiService');
const { fetchWeatherData, geocodeLocation } = require('./services/weatherService');
const { generateAdvisory } = require('./services/advisoryEngine');
const diseasesDatabase = require('./data/diseasesDb');
const translations = require('./services/translations');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing (limit expanded for base64 leaf image uploads)
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// API Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Agri-AI API Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// AI Crop Leaf Diagnosis Endpoint
app.post('/api/diagnose', (req, res) => {
  try {
    const { image, sampleId } = req.body;
    if (!image && !sampleId) {
      return res.status(400).json({ error: 'Image data or sampleId required' });
    }

    const diagnosis = diagnoseLeafImage(image, sampleId);
    res.json(diagnosis);
  } catch (error) {
    console.error('Error in /api/diagnose:', error);
    res.status(500).json({ error: 'Failed to diagnose leaf image', details: error.message });
  }
});

// Live Weather & Forecast Endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon, query } = req.query;

    let latitude = parseFloat(lat);
    let longitude = parseFloat(lon);
    let locationName = query || 'Guntur, Andhra Pradesh';

    if (query) {
      const geo = await geocodeLocation(query);
      latitude = geo.lat;
      longitude = geo.lon;
      locationName = geo.name;
    } else if (isNaN(latitude) || isNaN(longitude)) {
      latitude = 16.3067;
      longitude = 80.4365;
      locationName = 'Guntur, Andhra Pradesh';
    }

    const weatherData = await fetchWeatherData(latitude, longitude, locationName);
    res.json(weatherData);
  } catch (error) {
    console.error('Error in /api/weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

// Weather-Aware Integrated Advisory Endpoint
app.post('/api/advisory', async (req, res) => {
  try {
    const { diagnosis, weather } = req.body;
    
    if (!diagnosis || !weather) {
      return res.status(400).json({ error: 'Both diagnosis and weather payload are required' });
    }

    const advisory = generateAdvisory(diagnosis, weather);
    res.json(advisory);
  } catch (error) {
    console.error('Error in /api/advisory:', error);
    res.status(500).json({ error: 'Failed to generate advisory', details: error.message });
  }
});

// Disease Knowledge Catalog Endpoint
app.get('/api/diseases', (req, res) => {
  res.json(diseasesDatabase);
});

// Translations Dictionary Endpoint
app.get('/api/translations', (req, res) => {
  res.json(translations);
});

// Serve frontend client build in production mode if dist directory exists
const clientBuildPath = path.join(__dirname, '../client/dist');
if (require('fs').existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌾 Agri-AI Backend Server running on http://localhost:${PORT}`);
});
