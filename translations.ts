export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

type TranslationKeys = {
  appTitle: string;
  appSubtitle: string;
  uploaderClick: string;
  uploaderOr: string;
  uploaderFileType: string;
  uploaderMultiCrop: string;
  analyzeButton: string;
  removeImageButton: string;
  resultHealthy: string;
  resultDiseaseDetected: string;
  resultDescription: string;
  analyzeAnotherButton: string;
  spinnerAnalyzing: string;
  spinnerWait: string;
  spinnerMessage1: string;
  spinnerMessage2: string;
  spinnerMessage3: string;
  footerText: string;
  errorSelectImage: string;
  errorAnalysis: string;
  errorNoPlant: string;
  scannerTab: string;
  historyTab: string;
  preventionTab: string;
  speakResults: string;
  stopSpeaking: string;
  earlyStress: string;
  organicTreatments: string;
  chemicalTreatments: string;
  climateAdvisory: string;
  noHistory: string;
  historyCardTitle: string;
  historyHealthy: string;
  historyIssues: string;
  historyMoreIssues: string;
  historyAllHealthy: string;
  deleteEntry: string;
  analyzedImageAlt: string;
  zoomInLabel: string;
  zoomedImageAlt: string;
  closeZoomLabel: string;
  speakIssue: string;
  useCameraButton: string;
  captureButton: string;
  cancelButton: string;
  cameraError: string;
  reportIncorrectDiagnosis: string;
  feedbackSent: string;
  clearHistory: string;
  confirmClearHistory: string;
  confirmClearTitle: string;
  confirmButton: string;
  confirmDeleteEntryTitle: string;
  confirmDeleteEntryText: string;
  confirmDeleteEntryButton: string;
  preventionIntro: string;
  preventionDescription: string;
  cropTypeLabel: string;
  cropTypePlaceholder: string;
  seasonLabel: string;
  soilLabel: string;
  regionLabel: string;
  regionPlaceholder: string;
  generateCalendarButton: string;
  calendarTitle: string;
  noCalendarData: string;
  symptomsInputLabel: string;
  symptomsInputPlaceholder: string;
  recordSymptoms: string;
  stopRecording: string;
  speechRecognitionNotSupported: string;
  microphonePermissionDenied: string;
  searchLanguagePlaceholder: string;
  plantIdentification: string;
  learnMore: string;
  // FIX: Add missing translation keys for the GitHubExportModal component.
  githubModalTitle: string;
  githubModalDescription: string;
  githubOwnerLabel: string;
  githubRepoLabel: string;
  githubPathLabel: string;
  githubTokenLabel: string;
  githubTokenWarning: string;
  githubValidationError: string;
  githubExportButton: string;
  githubExportingButton: string;
  githubExportSuccess: string;
  githubExportError: string;
  // FIX: Add missing translation keys for the LeafCrushGame component.
  leafCrushTitle: string;
  score: string;
  resetGame: string;
};

export const translations: Record<string, TranslationKeys> = {
  en: {
    appTitle: 'AI Crop Disease Detector',
    appSubtitle: 'Upload an image of a crop leaf, and our AI will identify potential diseases and suggest treatment plans.',
    uploaderClick: 'Click to upload',
    uploaderOr: 'or drag and drop',
    uploaderFileType: 'PNG, JPG, or WEBP',
    uploaderMultiCrop: 'You can scan a single leaf or multiple plants at once.',
    analyzeButton: 'Analyze Crop',
    removeImageButton: 'Remove Image',
    resultHealthy: 'Healthy',
    resultDiseaseDetected: 'Disease Detected',
    resultDescription: 'Description',
    analyzeAnotherButton: 'Analyze Another',
    spinnerAnalyzing: 'AI is analyzing your crop...',
    spinnerWait: 'This may take a few moments.',
    spinnerMessage1: 'Detecting leaf patterns...',
    spinnerMessage2: 'Cross-referencing disease database...',
    spinnerMessage3: 'Compiling treatment plans...',
    footerText: 'AI Hackathon Toolkit. Built for innovation.',
    errorSelectImage: 'Please select an image first.',
    errorAnalysis: 'Failed to analyze the image. The AI model may be unavailable or the image may be unsupported. Please try again.',
    errorNoPlant: 'Could not identify a plant in the image. Please try a different photo.',
    scannerTab: 'Scanner',
    historyTab: 'History',
    preventionTab: 'Prevention',
    speakResults: 'Speak Results',
    stopSpeaking: 'Stop Speaking',
    earlyStress: 'Early Stress Detection',
    organicTreatments: 'Organic Treatments',
    chemicalTreatments: 'Chemical Treatments',
    climateAdvisory: 'Climate Advisory',
    noHistory: 'No analyses yet. Use the scanner to get started!',
    historyCardTitle: 'Analysis from',
    historyHealthy: 'Healthy',
    historyIssues: 'Issues',
    historyMoreIssues: 'more issues',
    historyAllHealthy: 'All Healthy',
    deleteEntry: 'Delete Entry',
    analyzedImageAlt: 'Analyzed crop leaf',
    zoomInLabel: 'Zoom in on image',
    zoomedImageAlt: 'Analyzed crop leaf - zoomed view',
    closeZoomLabel: 'Close zoomed image view',
    speakIssue: 'Issue {number}',
    useCameraButton: 'Use Camera',
    captureButton: 'Capture Photo',
    cancelButton: 'Cancel',
    cameraError: 'Could not access camera. Please ensure permissions are granted and your browser supports this feature.',
    reportIncorrectDiagnosis: 'Report Incorrect Diagnosis',
    feedbackSent: 'Feedback Sent. Thank you!',
    clearHistory: 'Clear All History',
    confirmClearHistory: 'Are you sure you want to delete all history? This action cannot be undone.',
    confirmClearTitle: 'Confirm Deletion',
    confirmButton: 'Yes, Delete All',
    confirmDeleteEntryTitle: 'Delete Entry?',
    confirmDeleteEntryText: 'Are you sure you want to permanently delete this entry? This action is irreversible.',
    confirmDeleteEntryButton: 'Yes, Delete',
    preventionIntro: 'Proactive Prevention Plan',
    preventionDescription: 'Get a personalized disease prevention calendar. Fill in the details below, and our AI will create a schedule of proactive tasks to keep your crops healthy.',
    cropTypeLabel: 'Crop Type',
    cropTypePlaceholder: 'e.g., Tomato, Corn, Wheat',
    seasonLabel: 'Current Season',
    soilLabel: 'Soil Type',
    regionLabel: 'Region / Climate',
    regionPlaceholder: 'e.g., Tropical, wet and humid',
    generateCalendarButton: 'Generate Calendar',
    calendarTitle: 'Your Personalized Prevention Calendar',
    noCalendarData: 'The AI could not generate a calendar for the provided details. Please try different inputs.',
    symptomsInputLabel: 'Describe Symptoms (Optional)',
    symptomsInputPlaceholder: 'e.g., "Yellow spots on upper leaves, wilting despite regular watering..."',
    recordSymptoms: 'Record Symptoms',
    stopRecording: 'Stop Recording',
    speechRecognitionNotSupported: 'Speech recognition is not supported by your browser.',
    microphonePermissionDenied: 'Microphone access was denied. Please allow it in your browser settings.',
    searchLanguagePlaceholder: 'Search languages...',
    plantIdentification: 'Plant Identification',
    learnMore: 'Learn More',
    githubModalTitle: 'Export to GitHub',
    githubModalDescription: 'Save this analysis report as a Markdown file in a GitHub repository. This requires a personal access token with `repo` scope.',
    githubOwnerLabel: 'Repository Owner',
    githubRepoLabel: 'Repository Name',
    githubPathLabel: 'File Path (.md)',
    githubTokenLabel: 'GitHub Personal Access Token',
    githubTokenWarning: 'Your token is used for a single request and is not stored. Be cautious with tokens.',
    githubValidationError: 'All fields are required. Please fill them out.',
    githubExportButton: 'Export to Repository',
    githubExportingButton: 'Exporting...',
    githubExportSuccess: 'Successfully exported report to GitHub!',
    githubExportError: 'Failed to export to GitHub. Please check your details and token permissions.',
    leafCrushTitle: 'Leaf Crush Saga',
    score: 'Score',
    resetGame: 'Reset Game',
  },
  hi: {
    appTitle: 'एआई फसल रोग डिटेक्टर',
    appSubtitle: 'फसल के पत्ते की एक छवि अपलोड करें, और हमारा एआई संभावित रोगों की पहचान करेगा और उपचार योजनाओं का सुझाव देगा।',
    uploaderClick: 'अपलोड करने के लिए क्लिक करें',
    uploaderOr: 'या खींचें और छोड़ें',
    uploaderFileType: 'पीएनजी, जेपीजी, या वेबपी',
    uploaderMultiCrop: 'आप एक बार में एक पत्ती या कई पौधों को स्कैन कर सकते हैं।',
    analyzeButton: 'फसल का विश्लेषण करें',
    removeImageButton: 'छवि हटाएं',
    resultHealthy: 'स्वस्थ',
    resultDiseaseDetected: 'रोग का पता चला',
    resultDescription: 'विवरण',
    analyzeAnotherButton: 'दूसरा विश्लेषण करें',
    spinnerAnalyzing: 'एआई आपकी फसल का विश्लेषण कर रहा है...',
    spinnerWait: 'इसमें कुछ क्षण लग सकते हैं।',
    spinnerMessage1: 'पत्ती के पैटर्न का पता लगाया जा रहा है...',
    spinnerMessage2: 'रोग डेटाबेस से मिलान किया जा रहा है...',
    spinnerMessage3: 'उपचार योजनाएं तैयार की जा रही हैं...',
    footerText: 'एआई हैकाथॉन टूलकिट। नवाचार के लिए निर्मित।',
    errorSelectImage: 'कृपया पहले एक छवि चुनें।',
    errorAnalysis: 'छवि का विश्लेषण करने में विफल। एआई मॉडल अनुपलब्ध हो सकता है या छवि असमर्थित हो सकती है। कृपया पुन: प्रयास करें।',
    errorNoPlant: 'छवि में किसी पौधे की पहचान नहीं हो सकी। कृपया दूसरी तस्वीर आजमाएं।',
    scannerTab: 'स्कैनर',
    historyTab: 'इतिहास',
    preventionTab: 'निवारण',
    speakResults: 'परिणाम बोलें',
    stopSpeaking: 'बोलना बंद करें',
    earlyStress: 'प्रारंभिक तनाव का पता लगाना',
    organicTreatments: 'जैविक उपचार',
    chemicalTreatments: 'रासायनिक उपचार',
    climateAdvisory: 'जलवायु सलाह',
    noHistory: 'अभी तक कोई विश्लेषण नहीं हुआ है। आरंभ करने के लिए स्कैनर का उपयोग करें!',
    historyCardTitle: 'से विश्लेषण',
    historyHealthy: 'स्वस्थ',
    historyIssues: 'समस्याएं',
    historyMoreIssues: 'और समस्याएं',
    historyAllHealthy: 'सब स्वस्थ',
    deleteEntry: 'प्रविष्टि हटाएं',
    analyzedImageAlt: 'विश्लेषित फसल का पत्ता',
    zoomInLabel: 'छवि पर ज़ूम इन करें',
    zoomedImageAlt: 'विश्लेषित फसल का पत्ता - ज़ूम किया हुआ दृश्य',
    closeZoomLabel: 'ज़ूम की गई छवि बंद करें',
    speakIssue: 'मुद्दा {number}',
    useCameraButton: 'कैमरा का उपयोग करें',
    captureButton: 'तस्वीर खींचे',
    cancelButton: 'रद्द करें',
    cameraError: 'कैमरे तक नहीं पहुंच सका। कृपया सुनिश्चित करें कि अनुमति दी गई है और आपका ब्राउज़र इस सुविधा का समर्थन करता है।',
    reportIncorrectDiagnosis: 'गलत निदान की रिपोर्ट करें',
    feedbackSent: 'प्रतिक्रिया भेजी गई। धन्यवाद!',
    clearHistory: 'सारा इतिहास साफ़ करें',
    confirmClearHistory: 'क्या आप वाकई सारा इतिहास हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।',
    confirmClearTitle: 'हटाने की पुष्टि करें',
    confirmButton: 'हाँ, सब हटाएँ',
    confirmDeleteEntryTitle: 'प्रविष्टि हटाएं?',
    confirmDeleteEntryText: 'क्या आप वाकई इस प्रविष्टि को स्थायी रूप से हटाना चाहते हैं? यह क्रिया अपरिवर्तनीय है।',
    confirmDeleteEntryButton: 'हाँ, हटाएं',
    preventionIntro: 'सक्रिय रोकथाम योजना',
    preventionDescription: 'एक व्यक्तिगत रोग निवारण कैलेंडर प्राप्त करें। नीचे दिए गए विवरण भरें, और हमारा एआई आपकी फसलों को स्वस्थ रखने के लिए सक्रिय कार्यों की एक अनुसूची बनाएगा।',
    cropTypeLabel: 'फसल का प्रकार',
    cropTypePlaceholder: 'जैसे, टमाटर, मक्का, गेहूं',
    seasonLabel: 'वर्तमान मौसम',
    soilLabel: 'मिट्टी का प्रकार',
    regionLabel: 'क्षेत्र / जलवायु',
    regionPlaceholder: 'जैसे, उष्णकटबंधीय, गीला और आर्द्र',
    generateCalendarButton: 'कैलेंडर बनाएं',
    calendarTitle: 'आपका व्यक्तिगत रोकथाम कैलेंडर',
    noCalendarData: 'एआई दिए गए विवरणों के लिए कैलेंडर नहीं बना सका। कृपया अलग इनपुट प्रयास करें।',
    symptomsInputLabel: 'लक्षणों का वर्णन करें (वैकल्पिक)',
    symptomsInputPlaceholder: 'जैसे, "ऊपरी पत्तियों पर पीले धब्बे, नियमित पानी देने के बावजूद मुरझाना..."',
    recordSymptoms: 'लक्षण रिकॉर्ड करें',
    stopRecording: 'रिकॉर्डिंग बंद करें',
    speechRecognitionNotSupported: 'आपका ब्राउज़र वाक् पहचान का समर्थन नहीं करता है।',
    microphonePermissionDenied: 'माइक्रोफ़ोन एक्सेस अस्वीकार कर दिया गया था। कृपया इसे अपनी ब्राउज़र सेटिंग्स में अनुमति दें।',
    searchLanguagePlaceholder: 'भाषाएं खोजें...',
    plantIdentification: 'पौधे की पहचान',
    learnMore: 'और जानें',
    githubModalTitle: 'गिटहब में निर्यात करें',
    githubModalDescription: 'इस विश्लेषण रिपोर्ट को गिटहब रिपॉजिटरी में एक मार्कडाउन फ़ाइल के रूप में सहेजें। इसके लिए `repo` स्कोप के साथ एक व्यक्तिगत एक्सेस टोकन की आवश्यकता है।',
    githubOwnerLabel: 'रिपॉजिटरी स्वामी',
    githubRepoLabel: 'रिपॉजिटरी का नाम',
    githubPathLabel: 'फ़ाइल पथ (.md)',
    githubTokenLabel: 'गिटहब व्यक्तिगत एक्सेस टोकन',
    githubTokenWarning: 'आपका टोकन केवल एक अनुरोध के लिए उपयोग किया जाता है और संग्रहीत नहीं किया जाता है। टोकन के साथ सतर्क रहें।',
    githubValidationError: 'सभी फ़ील्ड आवश्यक हैं। कृपया उन्हें भरें।',
    githubExportButton: 'रिपॉजिटरी में निर्यात करें',
    githubExportingButton: 'निर्यात हो रहा है...',
    githubExportSuccess: 'रिपोर्ट सफलतापूर्वक गिटहब में निर्यात हो गई!',
    githubExportError: 'गिटहब में निर्यात करने में विफल। कृपया अपने विवरण और टोकन अनुमतियों की जांच करें।',
    leafCrushTitle: 'लीफ क्रश सागा',
    score: 'स्कोर',
    resetGame: 'गेम रीसेट करें',
  },
  te: {
    appTitle: 'AI పంట వ్యాధి డిటెక్టర్',
    appSubtitle: 'పంట ఆకు యొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి మరియు మా AI సంభావ్య వ్యాధులను గుర్తించి చికిత్స ప్రణాళికలను సూచిస్తుంది.',
    uploaderClick: 'అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి',
    uploaderOr: 'లేదా డ్రాగ్ చేసి డ్రాప్ చేయండి',
    uploaderFileType: 'PNG, JPG, లేదా WEBP',
    uploaderMultiCrop: 'మీరు ఒకేసారి ఒక ఆకును లేదా బహుళ మొక్కలను స్కాన్ చేయవచ్చు.',
    analyzeButton: 'పంటను విశ్లేషించండి',
    removeImageButton: 'చిత్రాన్ని తీసివేయండి',
    resultHealthy: 'ఆరోగ్యంగా ఉంది',
    resultDiseaseDetected: 'వ్యాధి కనుగొనబడింది',
    resultDescription: 'వివరణ',
    analyzeAnotherButton: 'మరొకటి విశ్లేషించండి',
    spinnerAnalyzing: 'AI మీ పంటను విశ్లేషిస్తోంది...',
    spinnerWait: 'దీనికి కొన్ని క్షణాలు పట్టవచ్చు.',
    spinnerMessage1: 'ఆకు నమూనాలను గుర్తిస్తోంది...',
    spinnerMessage2: 'వ్యాధి డేటాబేస్‌ను సరిపోల్చుతోంది...',
    spinnerMessage3: 'చికిత్స ప్రణాళికలను సంకలనం చేస్తోంది...',
    footerText: 'AI హ్యాకథాన్ టూల్‌కిట్. ఆవిష్కరణ కోసం నిర్మించబడింది.',
    errorSelectImage: 'దయచేసి ముందుగా ఒక చిత్రాన్ని ఎంచుకోండి.',
    errorAnalysis: 'చిత్రాన్ని విశ్లేషించడంలో విఫలమైంది. AI మోడల్ అందుబాటులో లేకపోవచ్చు లేదా చిత్రం మద్దతు లేనిది కావచ్చు. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    errorNoPlant: 'చిత్రంలో మొక్కను గుర్తించలేకపోయాము. దయచేసి వేరే ఫోటోను ప్రయత్నించండి.',
    scannerTab: 'స్కానర్',
    historyTab: 'చరిత్ర',
    preventionTab: 'నివారణ',
    speakResults: 'ఫలితాలను మాట్లాడండి',
    stopSpeaking: 'మాట్లాడటం ఆపండి',
    earlyStress: 'ప్రారంభ ఒత్తిడి గుర్తింపు',
    organicTreatments: 'సేంద్రీయ చికిత్సలు',
    chemicalTreatments: 'రసాయన చికిత్సలు',
    climateAdvisory: 'వాతావరణ సలహా',
    noHistory: 'ఇంకా విశ్లేషణలు లేవు. ప్రారంభించడానికి స్కానర్‌ని ఉపయోగించండి!',
    historyCardTitle: 'నుండి విశ్లేషణ',
    historyHealthy: 'ఆరోగ్యంగా ఉంది',
    historyIssues: 'సమస్యలు',
    historyMoreIssues: 'మరిన్ని సమస్యలు',
    historyAllHealthy: 'అన్నీ ఆరోగ్యంగా ఉన్నాయి',
    deleteEntry: 'ఎంట్రీని తొలగించండి',
    analyzedImageAlt: 'విశ్లేషించిన పంట ఆకు',
    zoomInLabel: 'చిత్రాన్ని జూమ్ చేయండి',
    zoomedImageAlt: 'విశ్లేషించిన పంట ఆకు - జూమ్ చేసిన వీక్షణ',
    closeZoomLabel: 'జూమ్ చేసిన చిత్ర వీక్షణను మూసివేయండి',
    speakIssue: 'సమస్య {number}',
    useCameraButton: 'కెమెరాను ఉపయోగించండి',
    captureButton: 'ఫోటో తీయండి',
    cancelButton: 'రద్దు',
    cameraError: 'కెమెరాను యాక్సెస్ చేయలేకపోయాము. దయచేసి అనుమతులు మంజూరు చేయబడి ఉన్నాయని మరియు మీ బ్రౌజర్ ఈ ఫీచర్‌కు మద్దతు ఇస్తుందని నిర్ధారించుకోండి.',
    reportIncorrectDiagnosis: 'తప్పు నిర్ధారణను నివేదించండి',
    feedbackSent: 'అభిప్రాయం పంపబడింది. ధన్యవాదాలు!',
    clearHistory: 'చరిత్ర మొత్తం క్లియర్ చేయండి',
    confirmClearHistory: 'మీరు చరిత్ర మొత్తాన్ని తొలగించాలనుకుంటున్నారని ఖచ్చితంగా అనుకుంటున్నారా? ఈ చర్యను రద్దు చేయడం సాధ్యం కాదు.',
    confirmClearTitle: 'తొలగింపును నిర్ధారించండి',
    confirmButton: 'అవును, అన్నీ తొలగించండి',
    confirmDeleteEntryTitle: 'ఎంట్రీని తొలగించాలా?',
    confirmDeleteEntryText: 'మీరు ఈ ఎంట్రీని శాశ్వతంగా తొలగించాలనుకుంటున్నారని ఖచ్చితంగా అనుకుంటున్నారా? ఈ చర్యను వెనక్కి తీసుకోలేరు.',
    confirmDeleteEntryButton: 'అవును, తొలగించు',
    preventionIntro: 'ముందస్తు నివారణ ప్రణాళిక',
    preventionDescription: 'వ్యక్తిగతీకరించిన వ్యాధి నివారణ క్యాలెండర్‌ను పొందండి. దిగువ వివరాలను పూరించండి, మరియు మా AI మీ పంటలను ఆరోగ్యంగా ఉంచడానికి చురుకైన పనుల షెడ్యూల్‌ను సృష్టిస్తుంది.',
    cropTypeLabel: 'పంట రకం',
    cropTypePlaceholder: 'ఉదా., టమోటా, మొక్కజొన్న, గోధుమ',
    seasonLabel: 'ప్రస్తుత సీజన్',
    soilLabel: 'నేల రకం',
    regionLabel: 'ప్రాంతం / వాతావరణం',
    regionPlaceholder: 'ఉదా., ఉష్ణమండల, తడి మరియు తేమ',
    generateCalendarButton: 'క్యాలెండర్‌ను రూపొందించండి',
    calendarTitle: 'మీ వ్యక్తిగతీకరించిన నివారణ క్యాలెండర్',
    noCalendarData: 'అందించిన వివరాల కోసం AI క్యాలెండర్‌ను రూపొందించలేకపోయింది. దయచేసి వేర్వేరు ఇన్‌పుట్‌లను ప్రయత్నించండి.',
    symptomsInputLabel: 'లక్షణాలను వివరించండి (ఐచ్ఛికం)',
    symptomsInputPlaceholder: 'ఉదా., "పై ఆకులపై పసుపు మచ్చలు, రోజూ నీరు పెట్టినా వాడిపోతున్నాయి..."',
    recordSymptoms: 'లక్షణాలను రికార్డ్ చేయండి',
    stopRecording: 'రికార్డింగ్ ఆపండి',
    speechRecognitionNotSupported: 'మీ బ్రౌజర్ ప్రసంగ గుర్తింపుకు మద్దతు ఇవ్వదు.',
    microphonePermissionDenied: 'మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది. దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో దీన్ని అనుమతించండి.',
    searchLanguagePlaceholder: 'భాషలను శోధించండి...',
    plantIdentification: 'మొక్క గుర్తింపు',
    learnMore: 'మరింత తెలుసుకోండి',
    githubModalTitle: 'GitHubకు ఎగుమతి చేయండి',
    githubModalDescription: 'ఈ విశ్లేషణ నివేదికను GitHub రిపోజిటరీలో మార్క్‌డౌన్ ఫైల్‌గా సేవ్ చేయండి. దీనికి `repo` స్కోప్‌తో వ్యక్తిగత యాక్సెస్ టోకెన్ అవసరం.',
    githubOwnerLabel: 'రిపోజిటరీ యజమాని',
    githubRepoLabel: 'రిపోజిటరీ పేరు',
    githubPathLabel: 'ఫైల్ పాత్ (.md)',
    githubTokenLabel: 'GitHub వ్యక్తిగత యాక్సెస్ టోకెన్',
    githubTokenWarning: 'మీ టోకెన్ ఒకే అభ్యర్థన కోసం ఉపయోగించబడుతుంది మరియు నిల్వ చేయబడదు. టోకెన్‌లతో జాగ్రత్తగా ఉండండి.',
    githubValidationError: 'అన్ని ఫీల్డ్‌లు అవసరం. దయచేసి వాటిని పూరించండి.',
    githubExportButton: 'రిపోజిటరీకి ఎగుమతి చేయండి',
    githubExportingButton: 'ఎగుమతి చేస్తోంది...',
    githubExportSuccess: 'నివేదిక GitHubకు విజయవంతంగా ఎగుమతి చేయబడింది!',
    githubExportError: 'GitHubకు ఎగుమతి చేయడంలో విఫలమైంది. దయచేసి మీ వివరాలను మరియు టోకెన్ అనుమతులను తనిఖీ చేయండి.',
    leafCrushTitle: 'లీఫ్ క్రష్ సాగా',
    score: 'స్కోరు',
    resetGame: 'గేమ్‌ను రీసెట్ చేయండి',
  },
};

export const diseaseTranslations: Record<string, Record<string, string>> = {
  en: {
    HEALTHY: 'Healthy',
    APHIDS: 'Aphids',
    POWDERY_MILDEW: 'Powdery Mildew',
    BLACK_SPOT: 'Black Spot',
    RUST: 'Rust',
    LEAF_BLIGHT: 'Leaf Blight',
    UNKNOWN: 'Unknown Issue',
  },
  hi: {
    HEALTHY: 'स्वस्थ',
    APHIDS: 'एफिड्स',
    POWDERY_MILDEW: 'पाउडरी मिल्ड्यू',
    BLACK_SPOT: 'ब्लैक स्पॉट',
    RUST: 'रस्ट',
    LEAF_BLIGHT: 'लीफ ब्लाइट',
    UNKNOWN: 'अज्ञात समस्या',
  },
  te: {
    HEALTHY: 'ఆరోగ్యంగా ఉంది',
    APHIDS: 'అఫిడ్స్',
    POWDERY_MILDEW: 'బూజు తెగులు',
    BLACK_SPOT: 'నల్ల మచ్చ',
    RUST: 'తుప్పు',
    LEAF_BLIGHT: 'ఆకు ఎండు తెగులు',
    UNKNOWN: 'తెలియని సమస్య',
  },
};