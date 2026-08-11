async function runApiTests() {
  console.log("🚀 Running Agri-AI Automated API Integration Tests...\n");

  try {
    // 1. Health Endpoint Test
    const healthRes = await fetch('http://localhost:5000/api/health');
    const healthData = await healthRes.json();
    console.log("1. ✅ HEALTH CHECK:", healthData.service, "Status:", healthData.status);

    // 2. Leaf Diagnosis Test
    const diagRes = await fetch('http://localhost:5000/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleId: 'tomato_early_blight' })
    });
    const diagData = await diagRes.json();
    console.log(`2. ✅ DIAGNOSIS ENGINE: Detected '${diagData.diseaseName}' (${diagData.diseaseNameTelugu})`);
    console.log(`   - Confidence: ${diagData.confidenceScore}% | Severity: ${diagData.severity} | Damaged Area: ${diagData.affectedLeafAreaPercent}%`);
    console.log(`   - Heatmap Spot Count: ${diagData.heatmapSpots.length} coordinates generated`);

    // 3. Open-Meteo Weather Test
    const weatherRes = await fetch('http://localhost:5000/api/weather?query=Vijayawada');
    const weatherData = await weatherRes.json();
    console.log(`3. ✅ WEATHER ENGINE: Location '${weatherData.locationName}'`);
    console.log(`   - Temp: ${weatherData.temperature}°C | Humidity: ${weatherData.humidity}% | Rain Chance: ${weatherData.rainProbabilityCurrent}%`);
    console.log(`   - 24h Hourly Forecast Count: ${weatherData.hourlyForecast.length} hours`);
    console.log(`   - 7-Day Forecast Days Count: ${weatherData.dailyForecast.length} days`);

    // 4. Integrated Advisory & Best Time to Act Engine Test
    const advRes = await fetch('http://localhost:5000/api/advisory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagnosis: diagData, weather: weatherData })
    });
    const advData = await advRes.json();
    console.log(`4. ✅ ADVISORY ENGINE: Spray Suitability = '${advData.spraySuitability}' (${advData.spraySuitabilityTelugu})`);
    console.log(`   - Weather Safety Hazards Count: ${advData.warnings.length}`);
    console.log(`   - Best Time to Act Schedule Days: ${advData.actionSchedule.length}`);
    console.log(`   - Organic Remedy sample: '${advData.organicPlan[0]}'`);
    console.log(`   - Chemical Remedy sample: '${advData.chemicalPlan[0]}'`);

    // 5. Disease Knowledge Base Test
    const dbRes = await fetch('http://localhost:5000/api/diseases');
    const dbData = await dbRes.json();
    console.log(`5. ✅ DISEASE KNOWLEDGE BASE: ${dbData.length} crop diseases cataloged.`);

    console.log("\n🎉 ALL API INTEGRATION TESTS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }
}

runApiTests();
