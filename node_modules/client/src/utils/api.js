// API Client for Agri-AI Backend

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function diagnoseImage(imagePayload, sampleId = null) {
  const res = await fetch(`${API_BASE}/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imagePayload, sampleId })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Diagnosis failed');
  }

  return res.json();
}

export async function fetchWeather(lat, lon, query = null) {
  let url = `${API_BASE}/weather?`;
  if (query) {
    url += `query=${encodeURIComponent(query)}`;
  } else if (lat && lon) {
    url += `lat=${lat}&lon=${lon}`;
  } else {
    url += `query=Guntur`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }

  return res.json();
}

export async function fetchAdvisory(diagnosis, weather) {
  const res = await fetch(`${API_BASE}/advisory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ diagnosis, weather })
  });

  if (!res.ok) {
    throw new Error('Failed to fetch advisory');
  }

  return res.json();
}

export async function fetchDiseaseCatalog() {
  const res = await fetch(`${API_BASE}/diseases`);
  return res.json();
}

export async function fetchTranslations() {
  const res = await fetch(`${API_BASE}/translations`);
  return res.json();
}
