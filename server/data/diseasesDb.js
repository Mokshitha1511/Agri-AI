// Database of Agricultural Crop Diseases & Remedies
// Supports Tomato, Potato, Rice, Corn, Cotton, Apple, Grape, Wheat

const diseasesDatabase = [
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    cropTelugu: "టమాటో",
    diseaseName: "Early Blight (Alternaria solani)",
    diseaseNameTelugu: "అర్లీ బ్లైట్ (నల్ల మచ్చ తెగులు)",
    pathogenType: "Fungal",
    pathogenTypeTelugu: "శిలీంధ్రం (ఫంగస్)",
    typicalSeverity: "Moderate",
    typicalSeverityScore: 65,
    description: "Concentric rings forming dark brown target-like lesions on older leaves, surrounded by yellow tissue halo.",
    descriptionTelugu: "పాత ఆకులపై నల్లటి వలయాకార మచ్చలు ఏర్పడి, మచ్చ చుట్టూ పసుపు రంగు వలయం ఉంటుంది.",
    symptoms: [
      "Target-board patterned dark brown spots on lower leaves",
      "Yellowing (chlorosis) around spots leading to defoliation",
      "Sunken brown lesions on stems and fruit stem-end"
    ],
    symptomsTelugu: [
      "క్రింది ఆకులపై టార్గెట్ బోర్డు వంటి నల్లటి రింగ్ మచ్చలు",
      "మచ్చల చుట్టూ పసుపు రంగు మారి ఆకులు రాలిపోవడం",
      "కాండం మరియు కాయ తొడిమ వద్ద నల్లటి మచ్చలు"
    ],
    organicRemedies: [
      "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 10,000 ppm (3 ml/L water) at 7-day intervals.",
      "Apply Jeevamrutha or Panchagavya (30 ml/L) as foliar spray to strengthen leaf immunity.",
      "Spray Trichoderma viride or Pseudomonas fluorescens (5g/L) during early morning hours."
    ],
    organicRemediesTelugu: [
      "5% వేప గింజల కషాయం లేదా వేప నూనె 10,000 ppm (లీటరు నీటికి 3 మి.లీ) 7 రోజుల వ్యవధిలో పిచికారీ చేయండి.",
      "జీవామృతం లేదా పంచగవ్య (లీటరుకు 30 మి.లీ) ఆకులపై పిచికారీ చేయండి.",
      "ట్రైకోడెర్మా విరిడే లేదా సూడోమోనాస్ (లీటరుకు 5 గ్రా) ఉదయం పూట పిచికారీ చేయండి."
    ],
    chemicalRemedies: [
      "Foliar spray of Mancozeb 75% WP @ 2.5 g/L of water at first appearance of spots.",
      "In severe conditions, spray Copper Oxychloride 50% WP @ 3.0 g/L or Azoxystrobin 23% SC @ 1 ml/L.",
      "Ensure alternate spray of systemic and contact fungicides to prevent resistance."
    ],
    chemicalRemediesTelugu: [
      "మొదటి మచ్చలు కనిపించగానే మాంకోజెబ్ 75% WP (లీటరు నీటికి 2.5 గ్రా) పిచికారీ చేయండి.",
      "తెగులు తీవ్రంగా ఉంటే కాపర్ ఆక్సీక్లోరైడ్ 50% WP (3.0 గ్రా/లీ) లేదా అజోక్సీస్ట్రోబిన్ (1 మి.లీ/లీ) వాడండి.",
      "శిలీంధ్ర సంహారిణులను మార్చి మార్చి పిచికారీ చేయండి."
    ],
    preventiveMeasures: [
      "Maintain crop rotation with non-solanaceous crops (e.g. legumes or maize).",
      "Remove infected bottom leaves and destroy crop residues after harvest.",
      "Avoid overhead sprinkler irrigation; use drip irrigation to keep foliage dry."
    ],
    preventiveMeasuresTelugu: [
      "టమాటో లేని ఇతర పంటలతో (చిక్కుడు, జొన్న) పంట మార్పిడి చేయండి.",
      "వ్యాధి సోకిన కింది ఆకులను తీసివేసి నాశనం చేయండి.",
      "ఆకులపై నీరు పడకుండా బిందు సేద్యం (డ్రిప్) వాడండి."
    ],
    weatherRiskConditions: {
      highRiskTemp: { min: 24, max: 32 },
      highRiskHumidity: 80, // % or higher
      sporeSpreadingRain: true
    }
  },
  {
    id: "potato_late_blight",
    crop: "Potato",
    cropTelugu: "బంగాళాదుంప",
    diseaseName: "Late Blight (Phytophthora infestans)",
    diseaseNameTelugu: "లేట్ బ్లైట్ (లేటు మచ్చ తెగులు)",
    pathogenType: "Oomycete / Water Mold",
    pathogenTypeTelugu: "ఓమైసైట్ / వాటర్ మోల్డ్",
    typicalSeverity: "High",
    typicalSeverityScore: 88,
    description: "Rapidly spreading dark water-soaked lesions with white fuzzy mold on underside of leaves in humid weather.",
    descriptionTelugu: "తేమ ఉన్నాతరంలో ఆకుల అడుగుభాగంలో తెల్లటి బూజుతో కూడిన నీటి మచ్చలు వేగంగా వ్యాపిస్తాయి.",
    symptoms: [
      "Water-soaked irregular black/brown patches starting on leaf tips",
      "White fungal downy growth visible on lower leaf surface under high humidity",
      "Rapid wilting and complete destruction of leaf canopy within 4-7 days"
    ],
    symptomsTelugu: [
      "ఆకుల చివర్లలో నీరు పట్టిన నల్లటి మచ్చలు",
      "తేమ ఎక్కువగా ఉన్నప్పుడు ఆకు వెనుక భాగంలో తెల్లటి బూజు",
      "4-7 రోజుల్లో చెట్టు ఆకులన్నీ కుళ్ళిపోయి ఎండిపోవడం"
    ],
    organicRemedies: [
      "Spray Bordeaux Mixture 1% (10g copper sulfate + 10g quicklime per L water).",
      "Apply fermented buttermilk spray (100 ml/L) mixed with asafoetida (hing 1g/L).",
      "Apply Bio-fungicide Trichoderma harzianum @ 10g/L preventive spray."
    ],
    organicRemediesTelugu: [
      "1% బోర్డో మిశ్రమం (లీటరు నీటికి 10గ్రా మైలతుత్తం + 10గ్రా సున్నం) పిచికారీ చేయండి.",
      "పులిసిన మజ్జిగ (100 మి.లీ/లీ) లో ఇంగువ (1గ్రా/లీ) కలిపి ఆకులపై చల్లండి.",
      "ట్రైకోడెర్మా హార్జియానమ్ (10గ్రా/లీ) నివారణగా పిచికారీ చేయండి."
    ],
    chemicalRemedies: [
      "Prophylactic spray of Chlorothalonil 75% WP @ 2.0 g/L or Mancozeb @ 2.5 g/L.",
      "Curative spray during outbreak: Cymoxanil 8% + Mancozeb 64% WP @ 3.0 g/L or Metalaxyl 8% + Mancozeb 64% @ 2.5 g/L.",
      "Repeat spray after 7-10 days depending on humidity and rain forecast."
    ],
    chemicalRemediesTelugu: [
      "ముందు జాగ్రత్తగా క్లోరోథలోనిల్ (2.0 గ్రా/లీ) లేదా మాంకోజెబ్ (2.5 గ్రా/లీ) చల్లండి.",
      "తెగులు తీవ్రత ఉంటే సైమోక్సనిల్ + మాంకోజెబ్ (3.0 గ్రా/లీ) లేదా మెటలాక్సిల్ + మాంకోజెబ్ పిచికారీ చేయండి.",
      "వాతావరణ తేమను బట్టి 7-10 రోజుల తర్వాత మళ్లీ పిచికారీ చేయండి."
    ],
    preventiveMeasures: [
      "Use certified disease-free seed tubers.",
      "Earthing up ridges up to 15-20 cm to protect tubers from fungal spore wash.",
      "Destroy infected foliage before tuber harvesting."
    ],
    preventiveMeasuresTelugu: [
      "ఆరోగ్యకరమైన ధృవీకరించబడిన విత్తన దుంపలను వాడండి.",
      "దుంపలకు మచ్చలు సోకకుండా మొక్క మొదలులో మట్టి బాగా నెట్టండి (15-20 సెం.మీ).",
      "పంట కోసే ముందు వ్యాధి సోకిన ఆకులను కాల్చివేయండి."
    ],
    weatherRiskConditions: {
      highRiskTemp: { min: 12, max: 22 },
      highRiskHumidity: 85,
      sporeSpreadingRain: true
    }
  },
  {
    id: "rice_leaf_blast",
    crop: "Rice",
    cropTelugu: "వరి (రియల్ రైస్)",
    diseaseName: "Rice Leaf Blast (Magnaporthe oryzae)",
    diseaseNameTelugu: "అగ్గి తెగులు (బ్లాస్ట్ తెగులు)",
    pathogenType: "Fungal",
    pathogenTypeTelugu: "శిలీంధ్రం (ఫంగస్)",
    typicalSeverity: "High",
    typicalSeverityScore: 82,
    description: "Spindle-shaped or eye-shaped lesions with brown margins and ash-gray center on leaf blades.",
    descriptionTelugu: "వరి ఆకులపై ఇరువైపులా సూదిగా ఉండి మధ్యలో బూడిద రంగు, అంచులలో గోధుమ రంగు ఉన్న కంటి ఆకారపు మచ్చలు.",
    symptoms: [
      "Spindle-shaped diamond spots with pointed ends on leaf blades",
      "Lesion center dries out becoming grayish-white while outer ring is dark brown",
      "In severe cases, leaf blades dry completely ('burnt' appearance)"
    ],
    symptomsTelugu: [
      "ఆకులపై సూది ఆకారపు వజ్రపు మచ్చలు",
      "మచ్చల మధ్య భాగం ఎండి బూడిద రంగుగా మారడం",
      "తీవ్రమైనప్పుడు ఆకులన్నీ ఎండిపోయి కాలినట్లు కనిపిస్తాయి"
    ],
    organicRemedies: [
      "Foliar spray of Cow Urine + Neem leaf extract solution (10% strength, 100ml/L water).",
      "Spray Kasugamycin 3% SL or bio-agent Pseudomonas fluorescens @ 10 g/L.",
      "Dust wood ash mixed with quicklime lightly over wet leaf canopy in morning."
    ],
    organicRemediesTelugu: [
      "ఆవు మూత్రం + వేప ఆకుల కషాయం (10% ద్రావణం) పిచికారీ చేయండి.",
      "సూడోమోనాస్ ఫ్లోరైసెన్స్ (10 గ్రా/లీ) పిచికారీ చేయండి.",
      "ఉదయం ఆకులపై మంచు ఉన్నప్పుడు బూడిద చల్లండి."
    ],
    chemicalRemedies: [
      "Spray Tricyclazole 75% WP @ 0.6 g/L water or Isoprothiolane 40% EC @ 1.5 ml/L.",
      "Alternative effective systemic fungicide: Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.4 g/L.",
      "Spray during late afternoon when relative humidity drops slightly."
    ],
    chemicalRemediesTelugu: [
      "ట్రైసైక్లజోల్ 75% WP (0.6 గ్రా/లీ) లేదా ఐసోప్రోథియోలేన్ (1.5 మి.లీ/లీ) పిచికారీ చేయండి.",
      "టెబుకోనజోల్ + ట్రైఫ్లాక్సీస్ట్రోబిన్ (0.4 గ్రా/లీ) చల్లవచ్చు.",
      "సాయంత్రం వేళల్లో పిచికారీ చేయడం ఉత్తమం."
    ],
    preventiveMeasures: [
      "Avoid excessive nitrogen fertilizer application; split N dosage into 3-4 doses.",
      "Maintain standing water layer in field (2-5 cm) to suppress blast spread.",
      "Use resistant varieties like Swarna, BPT 5204 resistant strains."
    ],
    preventiveMeasuresTelugu: [
      "యూరియా (నత్రజని) ఎక్కువ వేయవద్దు; 3-4 విడతలుగా వేయండి.",
      "పొలంలో 2-5 సెం.మీ నీటి మట్టం నిలిపి ఉంచండి.",
      "వ్యాధి నిరోధక రకాలను ఎన్నుకోండి."
    ],
    weatherRiskConditions: {
      highRiskTemp: { min: 20, max: 28 },
      highRiskHumidity: 90,
      sporeSpreadingRain: false
    }
  },
  {
    id: "corn_common_rust",
    crop: "Corn / Maize",
    cropTelugu: "మొక్కజొన్న",
    diseaseName: "Common Rust (Puccinia sorghi)",
    diseaseNameTelugu: "కామన్ రస్ట్ (మచ్చలు / కాషాయ తెగులు)",
    pathogenType: "Fungal Rust",
    pathogenTypeTelugu: "ఫంగల్ రస్ట్ (తామర)",
    typicalSeverity: "Moderate",
    typicalSeverityScore: 55,
    description: "Golden-brown to reddish pustules on upper and lower surfaces of maize leaf blades.",
    descriptionTelugu: "మొక్కజొన్న ఆకుల పైభాగాన మరియు క్రింది భాగంలో ఎర్రటి గోధుమ రంగు పొక్కులు ఆకస్మికంగా వస్తాయి.",
    symptoms: [
      "Small cinnamon-brown elongated pustules appearing on leaves",
      "Powdery reddish spores rubbing off on fingers when touched",
      "Premature drying of leaf tissue in dry warm weather"
    ],
    symptomsTelugu: [
      "ఆకులపై ఇటుక ఎరుపు/గోధుమ రంగు చిన్న పొక్కులు",
      "చేతితో తాకితే చేతికి ఎర్రటి పొడి అంటుకోవడం",
      "ఆకులు త్వరగా ఎండిపోవడం"
    ],
    organicRemedies: [
      "Spray Sulphur 80% WDG bio-spray @ 3.0 g/L.",
      "Apply sour whey / fermented milk (50 ml/L) to create acidic foliar barrier."
    ],
    organicRemediesTelugu: [
      "సల్ఫర్ 80% WDG (3.0 గ్రా/లీ) పిచికారీ చేయండి.",
      "పులిసిన మజ్జిగ ద్రావణం చల్లడం వల్ల శిలీంధ్ర పెరుగుదల తగ్గుతుంది."
    ],
    chemicalRemedies: [
      "Foliar spray of Propiconazole 25% EC @ 1.0 ml/L of water at first signs.",
      "Mancozeb 75% WP @ 2.5 g/L if disease spreads rapidly."
    ],
    chemicalRemediesTelugu: [
      "ప్రోపికోనజోల్ 25% EC (1.0 మి.లీ/లీ నీటికి) పిచికారీ చేయండి.",
      "తెగులు వేగంగా ఉంటే మాంకోజెబ్ (2.5 గ్రా/లీ) వాడండి."
    ],
    preventiveMeasures: [
      "Plant early in the season to evade heavy rust spore loads.",
      "Ensure proper plant spacing for sunlight penetration."
    ],
    preventiveMeasuresTelugu: [
      "సమయానికి ముందే విత్తనాలు విత్తుకోవాలి.",
      "మొక్కల మధ్య సరైన దూరం పాటించండి."
    ],
    weatherRiskConditions: {
      highRiskTemp: { min: 16, max: 25 },
      highRiskHumidity: 75,
      sporeSpreadingRain: false
    }
  },
  {
    id: "cotton_bacterial_blight",
    crop: "Cotton",
    cropTelugu: "ప్రత్తి",
    diseaseName: "Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)",
    diseaseNameTelugu: "బాక్టీరియల్ బ్లైట్ (కోణీయ ఆకు మచ్చ తెగులు)",
    pathogenType: "Bacterial",
    pathogenTypeTelugu: "బాక్టీరియా",
    typicalSeverity: "High",
    typicalSeverityScore: 78,
    description: "Water-soaked angular spots bounded by leaf veins, turning dark brown/black with stem canker.",
    descriptionTelugu: "ఆకు ఈనెల మధ్య కోణీయ ఆకారంలో నీరు పట్టిన మచ్చలు, తరువాత నల్లబడి కాయలు కూడా దెబ్బతింటాయి.",
    symptoms: [
      "Angular water-soaked translucent lesions bounded by veins",
      "Black arm symptom on branches causing stem breakage",
      "Boll rot leading to stained lint and boll drop"
    ],
    symptomsTelugu: [
      "ఈనెల సరిహద్దులలో కోణీయ నీటి మచ్చలు",
      "కొమ్మలపై నల్లటి మచ్చలు ఏర్పడి కొమ్మలు విరిగిపోవడం",
      "కాయలు కుళ్ళిపోవడం మరియు దూది నల్లబడటం"
    ],
    organicRemedies: [
      "Soak seeds in 0.1% Streptocycline + Copper sulfate solution before sowing.",
      "Spray Neem Oil (5ml/L) + Panchagavya (30ml/L) at 10-day intervals."
    ],
    organicRemediesTelugu: [
      "విత్తనాలను విత్తే ముందు బ్యాక్టీరియా నాశినితో శుద్ధి చేయండి.",
      "వేప నూనె + పంచగవ్య 10 రోజుల వ్యవధిలో పిచికారీ చేయండి."
    ],
    chemicalRemedies: [
      "Spray Copper Oxychloride 50% WP @ 3.0 g + Streptocycline @ 0.1 g (100 mg) per Liter of water.",
      "Repeat spray 12 days later if rainy weather persists."
    ],
    chemicalRemediesTelugu: [
      "కాపర్ ఆక్సీక్లోరైడ్ (3.0 గ్రా) + స్ట్రెప్టోసైక్లిన్ (0.1 గ్రా) లీటరు నీటికి కలిపి పిచికారీ చేయండి.",
      "వర్షాలు ఉంటే 12 రోజుల తర్వాత మళ్లీ చేయండి."
    ],
    preventiveMeasures: [
      "Use acid delinted seed tubers.",
      "Destroy cotton crop stubble after harvest."
    ],
    preventiveMeasuresTelugu: [
      "యాసిడ్ తో శుద్ధి చేసిన విత్తనాలు మాత్రమే వాడండి.",
      "పంట కోత అనంతరం మిగిలిన వ్యర్థాలను కాల్చండి."
    ],
    weatherRiskConditions: {
      highRiskTemp: { min: 28, max: 36 },
      highRiskHumidity: 80,
      sporeSpreadingRain: true
    }
  },
  {
    id: "healthy_crop",
    crop: "General Crop",
    cropTelugu: "సాధారణ పంట",
    diseaseName: "Healthy Foliage (No Disease Detected)",
    diseaseNameTelugu: "ఆరోగ్యకరమైన ఆకు (తెగులు ఏమీ లేదు)",
    pathogenType: "None",
    pathogenTypeTelugu: "ఏదీ లేదు",
    typicalSeverity: "Healthy",
    typicalSeverityScore: 0,
    description: "Vibrant green uniform leaf structure with healthy stomata and no visible fungal or bacterial lesions.",
    descriptionTelugu: "ఆకు అంతా పచ్చగా, ఆరోగ్యంగా ఉంది. ఎటువంటి శిలీంధ్రం లేదా బ్యాక్టీరియా మచ్చలు లేవు.",
    symptoms: [
      "Clean leaf lamina",
      "Even green pigmentation",
      "No spots, yellowing, or lesions"
    ],
    symptomsTelugu: [
      "స్వచ్ఛమైన ఆకు ఉపరితలం",
      "సమానమైన ఆకుపచ్చ రంగు",
      "ఎటువంటి మచ్చలు లేదా పసుపు రంగు లేదు"
    ],
    organicRemedies: [
      "Maintain regular crop nutrition using balanced organic compost and Jeevamrutha.",
      "Perform routine inspection every 3 days."
    ],
    organicRemediesTelugu: [
      "క్రమం తప్పకుండా జీవామృతం మరియు సేంద్రీయ ఎరువులు అందించండి.",
      "ప్రతి 3 రోజులకు ఒకసారి పంటను పరిశీలించండి."
    ],
    chemicalRemedies: [
      "No chemical fungicide or bactericide spray required at this stage."
    ],
    chemicalRemediesTelugu: [
      "ప్రస్తుతానికి ఎటువంటి రసాయన మందుల పిచికారీ అవసరం లేదు."
    ],
    preventiveMeasures: [
      "Maintain optimal field drainage and soil moisture.",
      "Monitor weather for disease outbreak alerts."
    ],
    preventiveMeasuresTelugu: [
      "పొలంలో నీరు నిలవకుండా చూసుకోండి.",
      "వాతావరణ సమాచారాన్ని గమనిస్తూ ఉండండి."
    ],
    weatherRiskConditions: {
      highRiskTemp: { min: 0, max: 50 },
      highRiskHumidity: 100,
      sporeSpreadingRain: false
    }
  }
];

module.exports = diseasesDatabase;
