// Web Speech API Voice Synthesis helper for Farmers

let synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let currentUtterance = null;

export function speakText(text, lang = 'en-US', onEndCallback = null) {
  if (!synth) {
    alert("Speech synthesis is not supported on this browser.");
    return false;
  }

  // Cancel any existing playback
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language voice code
  if (lang === 'te' || lang === 'te-IN') {
    utterance.lang = 'te-IN';
  } else {
    utterance.lang = 'en-US';
  }

  utterance.rate = 0.9; // Slightly slower speed for high clarity for farmers
  utterance.pitch = 1.0;

  utterance.onend = () => {
    currentUtterance = null;
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis error:", e);
    currentUtterance = null;
    if (onEndCallback) onEndCallback();
  };

  currentUtterance = utterance;
  synth.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (synth) {
    synth.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking() {
  return synth ? synth.speaking : false;
}
