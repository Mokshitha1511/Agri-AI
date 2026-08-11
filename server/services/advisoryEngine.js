// Advisory Engine: Combines AI Diagnosis + Weather Forecast

/**
 * Computes comprehensive weather-aware crop advisory and timing recommendations
 */
function generateAdvisory(diagnosis, weather) {
  if (!diagnosis || !weather) {
    return { error: "Missing diagnosis or weather data" };
  }

  const warnings = [];
  const warningsTelugu = [];

  const rainRisk = weather.next6HoursRainMax > 30 || weather.rainProbabilityCurrent > 30;
  const windRisk = weather.next6HoursWindMax >= 15 || weather.windSpeed >= 15;
  const highHeatRisk = weather.temperature >= 35;
  const highHumidityRisk = weather.humidity >= 80 && diagnosis.pathogenType.includes('Fungal');

  // Evaluate Rain Hazard
  if (rainRisk) {
    warnings.push({
      type: "RAIN_HAZARD",
      severity: "CRITICAL",
      icon: "cloud-rain",
      title: "🌧️ Rain Warning: Spraying Not Advised",
      titleTelugu: "🌧️ వర్షపు హెచ్చరిక: మందుల పిచికారీ తగదు",
      message: `Rain probability is ${weather.next6HoursRainMax}% within the next 6 hours. Spraying now will result in chemical runoff and wasted inputs.`,
      messageTelugu: `రాబోయే 6 గంటల్లో వర్షం కురిసే అవకాశం ${weather.next6HoursRainMax}% ఉంది. ఇప్పుడు పిచికారీ చేస్తే మందు కొట్టుకుపోతుంది.`
    });
  }

  // Evaluate Wind Drift Hazard
  if (windRisk) {
    warnings.push({
      type: "WIND_HAZARD",
      severity: "HIGH",
      icon: "wind",
      title: "💨 High Wind Drift Alert",
      titleTelugu: "💨 ఈదురు గాలుల హెచ్చరిక",
      message: `Wind speed is currently ${weather.windSpeed} km/h (max ${weather.next6HoursWindMax} km/h). Spraying in winds > 14 km/h causes dangerous chemical drift to neighboring fields.`,
      messageTelugu: `గాలి వేగం గంటకు ${weather.windSpeed} కి.మీ ఉంది. 14 కి.మీ కంటే ఎక్కువ గాలి ఉన్నప్పుడు పిచికారీ చేస్తే ఔషధం పక్క పొలాలకు కొట్టుకుపోతుంది.`
    });
  }

  // Evaluate High Heat Hazard
  if (highHeatRisk) {
    warnings.push({
      type: "HEAT_HAZARD",
      severity: "MODERATE",
      icon: "sun",
      title: "☀️ High Temperature Evaporation Risk",
      titleTelugu: "☀️ అధిక ఉష్ణోగ్రత హెచ్చరిక",
      message: `Current temperature is ${weather.temperature}°C. Spraying during peak afternoon heat causes rapid evaporation and potential leaf burn.`,
      messageTelugu: `ప్రస్తుత ఉష్ణోగ్రత ${weather.temperature}°C ఉంది. మధ్యాహ్నం ఎండలో పిచికారీ చేస్తే మందు త్వరగా ఆవిరై ఆకులు కాలిపోతాయి.`
    });
  }

  // Evaluate High Humidity Fungal Spread Alert
  if (highHumidityRisk) {
    warnings.push({
      type: "SPORE_SPREAD_HAZARD",
      severity: "HIGH",
      icon: "droplets",
      title: "🌫️ High Humidity Fungal Spore Alert",
      titleTelugu: "🌫️ అధిక తేమ శిలీంధ్ర వ్యాప్తి హెచ్చరిక",
      message: `Relative humidity is ${weather.humidity}%. Fungal spores spread rapidly under high moisture. Early intervention is strongly advised once rain subsides.`,
      messageTelugu: `వాతావరణంలో తేమ ${weather.humidity}% ఉంది. అధిక తేమ వద్ద శిలీంధ్రాలు (ఫంగస్) వేగంగా విస్తరిస్తాయి. వర్షం తగ్గగానే నివారణ చర్యలు తీసుకోండి.`
    });
  }

  // Determine Overall Action Suitability Status
  let spraySuitability = "OPTIMAL";
  let spraySuitabilityTelugu = "పిచికారీకి అనుకూలం";
  let suitabilityBadgeColor = "green";

  if (rainRisk || windRisk) {
    spraySuitability = "UNSUITABLE_NOW";
    spraySuitabilityTelugu = "ప్రస్తుతానికి పిచికారీ చేయవద్దు";
    suitabilityBadgeColor = "red";
  } else if (highHeatRisk || highHumidityRisk) {
    spraySuitability = "CAUTION_REQUIRED";
    spraySuitabilityTelugu = "జాగ్రత్తలతో పిచికారీ చేయండి";
    suitabilityBadgeColor = "amber";
  }

  // Generate "Best Time to Act" Action Schedule for next 3 days
  const actionSchedule = calculateBestTimeToActSchedule(weather.hourlyForecast, weather.dailyForecast);

  return {
    diseaseId: diagnosis.diseaseId,
    crop: diagnosis.crop,
    cropTelugu: diagnosis.cropTelugu,
    diseaseName: diagnosis.diseaseName,
    diseaseNameTelugu: diagnosis.diseaseNameTelugu,
    severity: diagnosis.severity,
    affectedAreaPercent: diagnosis.affectedLeafAreaPercent,
    spraySuitability,
    spraySuitabilityTelugu,
    suitabilityBadgeColor,
    warnings,
    actionSchedule,
    immediateGuidance: getImmediateGuidance(spraySuitability, diagnosis, weather),
    immediateGuidanceTelugu: getImmediateGuidanceTelugu(spraySuitability, diagnosis, weather),
    organicPlan: diagnosis.organicRemedies,
    organicPlanTelugu: diagnosis.organicRemediesTelugu,
    chemicalPlan: diagnosis.chemicalRemedies,
    chemicalPlanTelugu: diagnosis.chemicalRemediesTelugu,
    preventiveSteps: diagnosis.preventiveMeasures,
    preventiveStepsTelugu: diagnosis.preventiveMeasuresTelugu,
    generatedAt: new Date().toISOString()
  };
}

function calculateBestTimeToActSchedule(hourlyForecast = [], dailyForecast = []) {
  const schedule = [];
  const days = ['Today / ఈరోజు', 'Tomorrow / రేపు', 'Day 3 / ఎల్లుండి'];

  for (let d = 0; d < 3; d++) {
    const dayLabel = days[d];
    const slots = [
      { id: `d${d}_morn`, timeSlot: "Early Morning (6:00 AM - 9:00 AM)", timeSlotTelugu: "ఉదయం (6:00 AM - 9:00 AM)" },
      { id: `d${d}_mid`, timeSlot: "Mid-Day (11:00 AM - 2:00 PM)", timeSlotTelugu: "మధ్యాహ్నం (11:00 AM - 2:00 PM)" },
      { id: `d${d}_eve`, timeSlot: "Late Afternoon (4:00 PM - 7:00 PM)", timeSlotTelugu: "సాయంత్రం (4:00 PM - 7:00 PM)" }
    ];

    const evaluatedSlots = slots.map((slot, index) => {
      // Find approximate hourly index offset
      const hourIndex = (d * 24) + (index === 0 ? 7 : (index === 1 ? 12 : 17));
      const hData = hourlyForecast[hourIndex] || {
        temp: 26 + index * 3,
        rainProbability: d === 1 ? 55 : (index === 1 ? 10 : 5),
        windSpeed: 7 + index * 2
      };

      let status = "BEST";
      let statusTelugu = "ఉత్తమ సమయం";
      let reason = "Mild temperature, quiet winds, zero rain chance.";
      let reasonTelugu = "అనుకూలమైన ఉష్ణోగ్రత, గాలి తక్కువ, వర్షం లేదు.";
      let badgeClass = "badge-success";

      if (hData.rainProbability > 30) {
        status = "AVOID";
        statusTelugu = "చేయవద్దు (వర్షం)";
        reason = `High Rain Risk (${hData.rainProbability}%). Spray will wash off.`;
        reasonTelugu = `వర్షం కురిసే అవకాశం (${hData.rainProbability}%).`;
        badgeClass = "badge-danger";
      } else if (hData.windSpeed >= 14) {
        status = "AVOID";
        statusTelugu = "చేయవద్దు (ఈదురు గాలులు)";
        reason = `Wind Speed ${hData.windSpeed} km/h causes high chemical drift.`;
        reasonTelugu = `ఈదురు గాలుల వేగం ${hData.windSpeed} కి.మీ/గంట.`;
        badgeClass = "badge-danger";
      } else if (hData.temp >= 34 || index === 1) {
        status = "CAUTION";
        statusTelugu = "జాగ్రత్త (ఎండ ఎక్కువ)";
        reason = `High sun intensity & temp (${hData.temp}°C). Rapid evaporation.`;
        reasonTelugu = `అధిక ఎండ మరియు ఉష్ణోగ్రత (${hData.temp}°C).`;
        badgeClass = "badge-warning";
      }

      return {
        ...slot,
        temp: hData.temp,
        rainProbability: hData.rainProbability,
        windSpeed: hData.windSpeed,
        status,
        statusTelugu,
        reason,
        reasonTelugu,
        badgeClass
      };
    });

    schedule.push({
      dayIndex: d,
      dayLabel,
      slots: evaluatedSlots
    });
  }

  return schedule;
}

function getImmediateGuidance(status, diagnosis, weather) {
  if (diagnosis.diseaseId === 'healthy_crop') {
    return "Your crop leaves appear healthy! Continue routine watering, weeding, and organic compost application.";
  }

  if (status === 'UNSUITABLE_NOW') {
    return `DO NOT SPRAY RIGHT NOW due to upcoming ${weather.next6HoursRainMax > 30 ? 'rain' : 'high winds'}. Wait for the recommended window shown in the "Best Time to Act" schedule below. Prepare your spray solution in advance so you can act quickly when conditions improve.`;
  }

  return `Conditions are currently suitable for crop treatment. Apply the recommended remedy during early morning (6-9 AM) or late afternoon (4-7 PM) for maximum absorption and safety.`;
}

function getImmediateGuidanceTelugu(status, diagnosis, weather) {
  if (diagnosis.diseaseId === 'healthy_crop') {
    return "మీ పంట ఆకులు ఆరోగ్యంగా ఉన్నాయి! క్రమం తప్పకుండా నీరు, సకాలంలో సేంద్రీయ ఎరువులు అందించండి.";
  }

  if (status === 'UNSUITABLE_NOW') {
    return `రాబోయే ${weather.next6HoursRainMax > 30 ? 'వర్షం' : 'ఈదురు గాలుల'} కారణంగా ప్రస్తుతం పిచికారీ చేయవద్దు. క్రింద ఇవ్వబడిన "ఉత్తమ సమయం" షెడ్యూల్ ప్రకారం పిచికారీ చేయండి.`;
  }

  return `ప్రస్తుత వాతావరణం మందుల పిచికారీకి అనుకూలంగా ఉంది. ఉదయం (6-9 AM) లేదా సాయంత్రం (4-7 PM) వేళల్లో పిచికారీ చేయడం వల్ల ఔషధం బాగా పనిచేస్తుంది.`;
}

module.exports = {
  generateAdvisory
};
