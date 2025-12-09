


import { Language } from '../types';

export const translations = {
  en: {
    appTitle: "MatriCare AI",
    nav: {
      dashboard: "Dashboard",
      riskScore: "Risk Check",
      tracker: "My Journey",
      usg: "USG Scan",
      ctg: "Heartbeat Check",
      nutrition: "Diet Plan",
      locator: "Find Hospital",
      schemes: "Govt. Schemes",
    },
    dashboard: {
      patientView: "Mother View",
      centerView: "Doctor View",
      greeting: "Namaste",
      progress: "Pregnancy Progress",
      week: "Week",
      daysToGo: "Days to go",
      trimester: "Trimester",
      nextCheckup: "Next Checkup",
      getDirections: "Get Directions",
      healthStatus: "Health Status",
      stable: "Your health is good.",
      emergency: "Emergency",
      emergencyDesc: "Severe pain, bleeding, or baby not moving?",
      callAmbulance: "Call Ambulance 108",
      callAsha: "Call ASHA Didi",
      logVitals: "Enter Today's Data",
      nutritionTip: "Daily Nutrition",
      medicines: "Medicines",
      save: "Save Details",
      weight: "Weight (kg)",
      bp: "BP (Blood Pressure)",
      hb: "Hemoglobin (Blood)",
    },
    risk: {
      title: "Clinical Risk Screening",
      patientProfile: "Patient Details",
      vitals: "Tests & Measurements",
      history: "History & Risks",
      calculate: "Calculate Risk",
      age: "Mother's Age",
      income: "Family Income (Card Type)",
      height: "Height (cm)",
      weight: "Weight (kg)",
      bpLabel: "Blood Pressure",
      bpGuide: [
        "Patient must sit for 5 mins.",
        "Keep arm at heart level.",
        "Record upper (Sys) & lower (Dia) number."
      ],
      fundalLabel: "Stomach Growth (Fundal Height)",
      fundalGuide: [
        "Patient lies flat.",
        "Measure from Pubic Bone (bottom) to top of Uterus.",
        "Use measuring tape (cm)."
      ],
      fhrLabel: "Baby Heart Rate",
      fhrGuide: [
        "Put jelly on stomach.",
        "Put Doppler on baby's back.",
        "Count beats for 1 minute."
      ],
      urineLabel: "Urine Protein",
      urineGuide: [
        "Dip strip in urine.",
        "Wait 1 minute.",
        "Check color change."
      ],
      hbLabel: "Hemoglobin (Blood Count)",
      weeksLabel: "Pregnancy Weeks",
      parityLabel: "Previous Births",
      symptoms: "Danger Signs",
      csection: "Previous C-Section",
      diabetes: "Sugar (Diabetes)",
      swelling: "Swelling (Edema)",
      bleeding: "Bleeding",
      result: "Result",
      recommendation: "Advice",
      action: "Action Needed",
      diagrams: {
        cuff: "Cuff",
        arm: "Arm",
        bone: "Bone",
        top: "Top",
        tape: "Tape",
        doppler: "Doppler",
        jelly: "Jelly",
        cup: "Cup",
        strip: "Strip"
      }
    },
    referral: {
      generate: "Generate Referral Letter",
      title: "Referral Note",
      dept: "Dept of Maternal Health",
      priority: "Priority Transfer",
      from: "From (Referring Center)",
      to: "To (Referral Unit)",
      phc: "Primary Health Center (PHC)",
      dh: "District Hospital / FRU",
      reason: "Reason for Referral",
      clinical: "Clinical Summary",
      vitals: "Vitals",
      print: "Print Letter",
      close: "Close"
    },
    usg: {
      title: "IUGR Detection (USG)",
      description: "Upload a fetal ultrasound image containing biometry data to screen for growth restriction.",
      clickUpload: "Click to upload USG image",
      uploadFormat: "Supports JPG, PNG",
      instructions: "Instructions:",
      instructionList: [
        "Ensure image shows measurement table.",
        "AI will read the values.",
        "Standard WHO charts used."
      ],
      analyze: "Analyze Biometry",
      processing: "Processing...",
      diagnosis: "Diagnosis",
      metrics: "Extracted Metrics",
      reasoning: "Clinical Reasoning",
      guideTitle: "How to Capture a Good USG Image",
      goodTitle: "Best Practices",
      badTitle: "Avoid These Mistakes",
      goodTips: [
        "Capture the Summary Table.",
        "Ensure Calipers are visible."
      ],
      badTips: [
        "Turn off flash to avoid glare.",
        "Hold phone steady to avoid blur."
      ]
    },
    ctg: {
      title: "Fetal Distress (CTG)",
      description: "Enter CTG features or upload a graph image to classify fetal state.",
      manualTab: "Manual Entry",
      scanTab: "Scan Graph",
      uploadDesc: "Upload a clear photo of the CTG trace paper.",
      extractBtn: "Extract Data from Graph",
      extracting: "Reading Graph...",
      extracted: "Data Extracted! Please verify the values below.",
      loadNormal: "Load Normal Sample",
      loadPathological: "Load Pathological Sample",
      labels: {
        baseline: "Baseline FHR (bpm)",
        accel: "Accelerations",
        movement: "Fetal Movements",
        contractions: "Uterine Contractions",
        lightDecel: "Light Decelerations",
        severeDecel: "Severe Decelerations",
        prolonged: "Prolonged Decelerations",
        abnormalstv: "% Abnormal STV",
        meanstv: "Mean STV"
      },
      classify: "Classify Fetal State",
      result: "State",
      confidence: "AI Confidence",
      charts: {
        trace: "Simulated FHR Trace",
        events: "Event Distribution"
      },
      guide: {
        title: "How to Read CTG Paper",
        baseline: "1. Baseline Heart Rate",
        baselineDesc: "Average speed when baby is resting.",
        accel: "2. Accelerations (Good)",
        accelDesc: "Heart rate goes UP (Hill).",
        decel: "3. Decelerations (Bad)",
        decelDesc: "Heart rate goes DOWN (Valley) with pain."
      }
    },
    locator: {
      title: "Nearest PMSMA Centers",
      subtitle: "Find Government Hospitals offering free antenatal care.",
      info: "PMSMA centers provide free checkups on the 9th of every month.",
      searchPlaceholder: "Enter city, district, or pincode...",
      searchButton: "Search",
      retryGps: "Retry GPS",
      useGps: "Use My Current Location",
      searching: "Searching for nearby maternity centers...",
      foundLocations: "Found Locations (Google Maps)",
      viewMap: "View on Google Maps",
      findNearMe: "Find Centers Near Me"
    },
    nutrition: {
      title: "AI Nutritionist",
      dietType: "Diet Preference",
      trimester: "Trimester",
      conditions: "Health Conditions",
      generate: "Generate Personalized Meal Plan",
      planTitle: "Daily Meal Plan",
      richIn: "Rich in",
      hydration: "Hydration Tip",
      avoid: "Foods to Avoid",
      types: {
        veg: "Vegetarian",
        nonveg: "Non-Veg",
        egg: "Eggetarian"
      },
      trimesters: {
        first: "1st Trimester (1-3 months)",
        second: "2nd Trimester (4-6 months)",
        third: "3rd Trimester (7-9 months)"
      }
    },
    chatbot: {
      placeholder: "Ask a question...",
      initial: "Namaste! I am MatriBot. How can I help you?",
      status: "Online",
      listening: "Listening..."
    },
    schemes: {
      pageTitle: "Government Schemes",
      subtitle: "Check eligibility and application process",
      stateLabel: "Select State",
      centralLabel: "Central Govt (All India)",
      benefitsLabel: "Benefits",
      eligibilityLabel: "Eligibility & Documents",
      processLabel: "How to Apply",
      disclaimer: "Information is for awareness. Please contact your ASHA worker or PHC for application.",
      tabs: {
        all: "All Schemes",
        track: "My Applications"
      },
      tracker: {
        title: "Application Tracker",
        empty: "You are not tracking any schemes yet.",
        add: "Add to Tracker",
        update: "Update Status",
        remove: "Remove",
        steps: {
          applied: "Application Submitted",
          verified: "Documents Verified",
          approved: "Approved",
          received: "Benefit Received"
        }
      },
      recommender: {
        title: "Check Your Eligibility",
        desc: "Enter your details to find schemes applicable to you.",
        children: "Living Children",
        category: "Category (Caste)",
        card: "Ration Card Type",
        check: "Check Schemes",
        recommended: "Recommended For You",
        options: {
          bpl: "BPL (Yellow/Orange)",
          apl: "APL (White)",
          sc: "SC / ST",
          gen: "General / OBC"
        }
      },
      pmsma: {
        name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
        desc: "Free antenatal checkups on the 9th of every month.",
        benefits: [
          "Free checkup by Gynecologist/Medical Officer.",
          "Free Ultrasound, Blood, and Urine tests.",
          "Identification of High-Risk Pregnancies.",
          "Color-coded stickers on Mother Child Protection (MCP) card."
        ],
        eligibility: "All pregnant women in their 2nd and 3rd trimester (4 months onwards). Visit nearest government hospital on the 9th.",
        process: [
          "Register at your nearest PHC/CHC.",
          "Get your Mother & Child Protection (MCP) Card.",
          "Visit the designated government facility on the 9th of any month.",
          "Look for the 'PMSMA' banner or help desk."
        ]
      },
      pmmvy: {
        name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
        desc: "Cash incentive of ₹5,000 for first live birth.",
        benefits: [
          "1st Installment: ₹1,000 (Early Registration).",
          "2nd Installment: ₹2,000 (After 6 months ANC).",
          "3rd Installment: ₹2,000 (After Child Birth & Vaccination)."
        ],
        eligibility: "Pregnant women for the first live birth. Requires Aadhaar Card and Bank Account linked to Aadhaar.",
        process: [
          "Contact your ASHA worker or Anganwadi Center (AWC).",
          "Fill Form 1-A (within 150 days of LMP) for 1st installment.",
          "Fill Form 1-B (after 6 months ANC) for 2nd installment.",
          "Fill Form 1-C (after birth registration) for 3rd installment.",
          "Submit copy of MCP Card, Aadhaar, and Bank Passbook."
        ]
      },
      jsy: {
        name: "Janani Suraksha Yojana (JSY)",
        desc: "Cash assistance for institutional delivery (hospital birth).",
        benefits: [
          "Rural Areas (LPS): ₹1,400 for mother + ₹600 for ASHA.",
          "Urban Areas: ₹1,000 for mother + ₹400 for ASHA.",
          "Promotes safe delivery in government hospitals."
        ],
        eligibility: "All pregnant women delivering in government health centers. BPL/SC/ST women delivering in accredited private institutions.",
        process: [
          "Ensure registration with ASHA/ANM during pregnancy.",
          "Must have JSY Card / MCP Card.",
          "Deliver the baby at a Government Hospital or Accredited Private Hospital.",
          "Provide Bank Account details to the Medical Officer after delivery.",
          "Money is credited directly to the bank account."
        ]
      },
      jssk: {
        name: "Janani Shishu Suraksha Karyakram (JSSK)",
        desc: "Zero expense delivery for mother and sick newborn.",
        benefits: [
          "Free Cashless Delivery (Normal/C-Section).",
          "Free Drugs, Diagnostics, Blood, and Diet.",
          "Free Transport (Home to Hospital, Referral, Drop-back)."
        ],
        eligibility: "All pregnant women delivering in public health institutions and sick newborns (up to 1 year).",
        process: [
          "No application form required.",
          "Simply visit any Government Health Facility for delivery.",
          "If asked to pay for medicine/test, complain to the Medical Superintendent (104 Helpline).",
          "Call 102/108 for free ambulance service."
        ]
      },
      mkb: {
        name: "Majhi Kanya Bhagyashree (Maharashtra)",
        desc: "Financial assistance for girl child retention and education.",
        benefits: [
          "₹50,000 if mother undergoes sterilization after 1 girl.",
          "₹25,000 for each girl if sterilization after 2 girls.",
          "Money deposited in fixed deposit."
        ],
        eligibility: "Residents of Maharashtra. BPL or annual income below ₹7.5 Lakh. Sterilization certificate required.",
        process: [
          "Apply at Anganwadi or Gram Panchayat.",
          "Submit application form with birth certificate and income proof.",
          "Submit sterilization certificate of mother or father."
        ]
      },
      kanya: {
        name: "Mukhyamantri Kanya Utthan Yojana (Bihar)",
        desc: "Financial support for girl child from birth to graduation.",
        benefits: [
          "₹2,000 upon birth.",
          "₹1,000 after 1 year immunization.",
          "Additional amounts at school stages.",
          "Total up to ₹50,000 till graduation."
        ],
        eligibility: "Permanent resident of Bihar. Maximum 2 daughters per family.",
        process: [
          "Apply online on the e-Kalyan portal.",
          "Or apply through Anganwadi Center.",
          "Required: Birth Certificate, Bank Account, Aadhaar of parents."
        ]
      }
    },
    tracker: {
      tabs: {
        timeline: "My Timeline",
        kicks: "Kick Counter",
        timer: "Labor Timer",
        bag: "Hospital Bag"
      },
      milestones: {
        title: "Pregnancy Milestones",
        subtitle: "Check off items as you complete them.",
        tt1: "TT Injection Dose 1",
        tt2: "TT Injection Dose 2",
        ifa: "Iron Folic Acid (100 days)",
        usg1: "Early Scan (11-14 Weeks)",
        usg2: "Anomaly Scan (18-22 Weeks)",
        anc1: "ANC Checkup 1 (Month 3)",
        anc2: "ANC Checkup 2 (Month 5)",
        anc3: "ANC Checkup 3 (Month 7)",
        anc4: "ANC Checkup 4 (Month 9)",
        bag: "Prepare Delivery Bag"
      },
      kicks: {
        title: "Track Baby's Movements",
        desc: "Count movements for 1 hour. Aim for 10 kicks. If less, drink water, lie on your left side, and try again.",
        start: "Start Session",
        tap: "Tap to Count Kick",
        finish: "Finish Session",
        history: "History",
        count: "Kicks",
        duration: "Mins",
        great: "Good Activity!",
        low: "Monitor Closely",
      },
      timer: {
        title: "Contraction Timer",
        desc: "Press Start when pain begins. Press Stop when it ends. Go to hospital if pains are 5 mins apart.",
        start: "Pain Started",
        stop: "Pain Stopped",
        duration: "Duration",
        freq: "Frequency",
        history: "Recent Contractions",
        alert: "Go to Hospital!",
        alertDesc: "Contractions are frequent."
      },
      bag: {
        title: "Hospital Bag Checklist",
        subtitle: "Pack these items by the 8th month.",
        categories: {
          docs: "Documents",
          mom: "For Mother",
          baby: "For Baby"
        },
        items: {
          mcp: "MCP Card / ANC File",
          id: "Aadhaar Card / ID Proof",
          bank: "Bank Passbook (for JSY)",
          ins: "Health Insurance Card",
          clothes: "Comfortable Clothes (3 sets)",
          towels: "Towels & Sanitary Pads",
          toiletries: "Soap, Brush, Comb",
          slippers: "Slippers",
          blanket: "Baby Blanket / Wrapper",
          diapers: "Cloth Nappies / Diapers",
          wipes: "Baby Wipes / Cotton",
          socks: "Baby Socks & Cap"
        }
      },
      weekInfo: {
        title: "Your Baby This Week",
        desc: "Baby is growing strong!",
      }
    }
  },
  hi: {
    appTitle: "मैट्री-केयर (MatriCare)",
    nav: {
      dashboard: "मुख्य पेज",
      riskScore: "जोखिम जांच",
      tracker: "मेरी यात्रा",
      usg: "सोनोग्राफी जांच",
      ctg: "धड़कन जांच",
      nutrition: "आहार योजना",
      locator: "अस्पताल खोजें",
      schemes: "सरकारी योजनाएं",
    },
    dashboard: {
      patientView: "माँ का पेज",
      centerView: "डॉक्टर पेज",
      greeting: "नमस्ते",
      progress: "गर्भावस्था की स्थिति",
      week: "सप्ताह",
      daysToGo: "दिन बाकी हैं",
      trimester: "तिमाही",
      nextCheckup: "अगली जांच",
      getDirections: "रास्ता देखें",
      healthStatus: "स्वास्थ्य स्थिति",
      stable: "आपका स्वास्थ्य अच्छा है।",
      emergency: "आपातकालीन (Emergency)",
      emergencyDesc: "क्या बहुत दर्द, खून या बच्चे की हलचल कम है?",
      callAmbulance: "एम्बुलेंस 108",
      callAsha: "आशा दीदी को फोन करें",
      logVitals: "आज की जांच लिखें",
      nutritionTip: "आज का खाना",
      medicines: "दवाइयाँ",
      save: "सुरक्षित करें",
      weight: "वजन (किलो)",
      bp: "बी.पी (रक्तचाप)",
      hb: "खून की मात्रा (HB)",
    },
    risk: {
      title: "गर्भावस्था जोखिम जांच",
      patientProfile: "मरीज की जानकारी",
      vitals: "जांच और माप",
      history: "पुराना इतिहास और खतरे",
      calculate: "जोखिम पता करें",
      age: "माँ की उम्र",
      income: "राशन कार्ड (आय)",
      height: "कद (से.मी.)",
      weight: "वजन (किलो)",
      bpLabel: "बी.पी (रक्तचाप)",
      bpGuide: [
        "मरीज को 5 मिनट आराम से बैठाएं।",
        "हाथ को दिल के स्तर पर रखें।",
        "ऊपर (Sys) और नीचे (Dia) का नंबर लिखें।"
      ],
      fundalLabel: "पेट का माप (Fundal Height)",
      fundalGuide: [
        "मरीज को सीधा लेटाएं।",
        "नीचे की हड्डी से गर्भाशय के ऊपर तक नापें।",
        "इंच टेप (से.मी.) का प्रयोग करें।"
      ],
      fhrLabel: "बच्चे की धड़कन",
      fhrGuide: [
        "पेट पर जेली लगाएं।",
        "डॉपलर मशीन बच्चे की पीठ की तरफ रखें।",
        "1 मिनट तक धड़कन गिनें।"
      ],
      urineLabel: "पेशाब की जांच (Protein)",
      urineGuide: [
        "स्ट्रिप को पेशाब में डुबोएं।",
        "1 मिनट रुकें।",
        "रंग बदलकर देखें।"
      ],
      hbLabel: "खून की मात्रा (HB)",
      weeksLabel: "गर्भावस्था के सप्ताह",
      parityLabel: "पहले कितने बच्चे हैं?",
      symptoms: "खतरे के संकेत",
      csection: "पहले बड़ा ऑपरेशन (C-Section)",
      diabetes: "शुगर की बीमारी",
      swelling: "हाथ-पैर में सूजन",
      bleeding: "खून बहना",
      result: "परिणाम",
      recommendation: "सलाह",
      action: "क्या करना है",
      diagrams: {
        cuff: "पट्टा",
        arm: "हाथ",
        bone: "हड्डी",
        top: "ऊपर",
        tape: "टेप",
        doppler: "मशीन",
        jelly: "जेली",
        cup: "कप",
        strip: "स्ट्रिप"
      }
    },
    referral: {
      generate: "रेफरल पत्र बनाएं",
      title: "रेफरल नोट",
      dept: "मातृ स्वास्थ्य विभाग",
      priority: "प्राथमिकता स्थानांतरण (Urgent)",
      from: "प्रेषक (PHC)",
      to: "सेवा में (बड़ा अस्पताल)",
      phc: "प्राथमिक स्वास्थ्य केंद्र (PHC)",
      dh: "जिला अस्पताल / FRU",
      reason: "रेफर करने का कारण",
      clinical: "नैदानिक सारांश",
      vitals: "जांच रिपोर्ट",
      print: "प्रिंट करें",
      close: "बंद करें"
    },
    usg: {
      title: "बच्चे का विकास (सोनोग्राफी)",
      description: "सोनोग्राफी की फोटो अपलोड करें। AI बच्चे के विकास (IUGR) की जांच करेगा।",
      clickUpload: "फोटो अपलोड करें",
      uploadFormat: "JPG, PNG स्वीकार्य",
      instructions: "निर्देश:",
      instructionList: [
        "फोटो में माप वाली तालिका दिखनी चाहिए।",
        "AI नंबर पढ़कर जांच करेगा।",
        "विश्व स्वास्थ्य संगठन के मानकों का उपयोग होता है।"
      ],
      analyze: "जांच शुरू करें",
      processing: "जांच हो रही है...",
      diagnosis: "निदान",
      metrics: "माप (Metrics)",
      reasoning: "कारण और विवरण",
      guideTitle: "सोनोग्राफी फोटो कैसे लें?",
      goodTitle: "सही तरीका",
      badTitle: "गलत तरीका",
      goodTips: [
        "माप वाली टेबल की फोटो लें।",
        "निशान (Calipers) साफ़ दिखने चाहिए।"
      ],
      badTips: [
        "फ्लॅश बंद रखें, चमक से बचें।",
        "फोन को स्थिर रखें, हिलने न दें।"
      ]
    },
    ctg: {
      title: "बच्चे की धड़कन (CTG)",
      description: "बच्चे की धड़कन की जानकारी डालें या ग्राफ अपलोड करें।",
      manualTab: "मैनुअल फॉर्म",
      scanTab: "ग्राफ स्कैन करें",
      uploadDesc: "CTG ग्राफ की साफ फोटो अपलोड करें।",
      extractBtn: "ग्राफ से डेटा निकालें",
      extracting: "ग्राफ पढ़ रहे हैं...",
      extracted: "डेटा निकल गया! कृपया नीचे चेक करें।",
      loadNormal: "सामान्य रिपोर्ट भरें",
      loadPathological: "खतरे वाली रिपोर्ट भरें",
      labels: {
        baseline: "औसत धड़कन (BPM)",
        accel: "बढ़त (Accelerations)",
        movement: "बच्चे की हलचल",
        contractions: "दर्द/संकुचन (Contractions)",
        lightDecel: "हल्की गिरावट",
        severeDecel: "गंभीर गिरावट",
        prolonged: "लंबी गिरावट",
        abnormalstv: "असामान्य STV %",
        meanstv: "औसत STV"
      },
      classify: "स्थिति की जांच करें",
      result: "स्थिति",
      confidence: "AI विश्वास",
      charts: {
        trace: "धड़कन का ग्राफ (अनुमानित)",
        events: "घटनाओं की संख्या"
      },
      guide: {
        title: "CTG ग्राफ कैसे पढ़ें?",
        baseline: "1. औसत धड़कन (Baseline)",
        baselineDesc: "जब बच्चा आराम कर रहा हो तब की गति।",
        accel: "2. धड़कन बढ़ना (अच्छा है)",
        accelDesc: "लाइन ऊपर जाती है (पहाड़ जैसा)।",
        decel: "3. धड़कन गिरना (खतरा)",
        decelDesc: "दर्द के साथ धड़कन नीचे जाती है (खाड़ी जैसा)।"
      }
    },
    locator: {
      title: "निकटतम PMSMA केंद्र",
      subtitle: "मुफ्त जांच के लिए सरकारी अस्पताल खोजें।",
      info: "PMSMA केंद्रों पर हर महीने की 9 तारीख को मुफ्त जांच होती है।",
      searchPlaceholder: "शहर या जिले का नाम लिखें...",
      searchButton: "खोजें",
      retryGps: "GPS फिर से कोशिश करें",
      useGps: "मेरे स्थान का उपयोग करें",
      searching: "नज़दीकी केंद्र खोजे जा रहे हैं...",
      foundLocations: "मिले हुए स्थान (Google Maps)",
      viewMap: "मैप पर देखें",
      findNearMe: "नज़दीकी केंद्र खोजें"
    },
    nutrition: {
      title: "पोषण सलाहकार (AI)",
      dietType: "भोजन का प्रकार",
      trimester: "गर्भावस्था का समय",
      conditions: "स्वास्थ्य समस्याएं",
      generate: "आहार योजना बनाएं",
      planTitle: "आज का भोजन",
      richIn: "इसमें है",
      hydration: "पानी की सलाह",
      avoid: "इनसे बचें",
      types: {
        veg: "शाकाहारी",
        nonveg: "मांसाहारी",
        egg: "अंडा-शाकाहारी"
      },
      trimesters: {
        first: "पहली तिमाही (1-3 महीने)",
        second: "दूसरी तिमाही (4-6 महीने)",
        third: "तीसरी तिमाही (7-9 महीने)"
      }
    },
    chatbot: {
      placeholder: "प्रश्न पूछें...",
      initial: "नमस्ते! मैं आपकी 'मैट्री-बॉट' हूँ। मैं आपकी कैसे मदद कर सकती हूँ?",
      status: "ऑनलाइन",
      listening: "सुन रहा हूँ..."
    },
    schemes: {
      pageTitle: "सरकारी योजनाएं",
      subtitle: "पात्रता और आवेदन प्रक्रिया की जानकारी",
      stateLabel: "राज्य चुनें",
      centralLabel: "केंद्र सरकार (पूरे भारत)",
      benefitsLabel: "लाभ",
      eligibilityLabel: "पात्रता और दस्तावेज़",
      processLabel: "आवेदन कैसे करें",
      disclaimer: "यह जानकारी जागरूकता के लिए है। आवेदन के लिए कृपया अपनी आशा कार्यकर्ता या PHC से संपर्क करें।",
      tabs: {
        all: "सभी योजनाएं",
        track: "मेरे आवेदन"
      },
      tracker: {
        title: "आवेदन ट्रैकर",
        empty: "आप अभी किसी भी योजना को ट्रैक नहीं कर रहे हैं।",
        add: "ट्रैकर में जोड़ें",
        update: "स्थिती बदलें",
        remove: "हटाएं",
        steps: {
          applied: "आवेदन जमा किया",
          verified: "दस्तावेज़ सत्यापित",
          approved: "स्वीकृत",
          received: "लाभ प्राप्त हुआ"
        }
      },
      recommender: {
        title: "अपनी पात्रता जांचें",
        desc: "योजनाओं का लाभ उठाने के लिए अपनी जानकारी भरें।",
        children: "जीवित बच्चे",
        category: "श्रेणी (Caste)",
        card: "राशन कार्ड का प्रकार",
        check: "योजनाएं देखें",
        recommended: "आपके लिए अनुशंसित",
        options: {
          bpl: "BPL (पीला/केसरी)",
          apl: "APL (सफेद)",
          sc: "SC / ST",
          gen: "General / OBC"
        }
      },
      pmsma: {
        name: "प्रधानमंत्री सुरक्षित मातृत्व अभियान (PMSMA)",
        desc: "हर महीने की 9 तारीख को मुफ्त प्रसव पूर्व जांच।",
        benefits: [
          "डॉक्टर द्वारा मुफ्त जांच।",
          "मुफ्त सोनोग्राफी, खून और पेशाब की जांच।",
          "उच्च जोखिम वाली गर्भावस्था (High Risk) की पहचान।",
          "MCP कार्ड पर रंगीन स्टिकर।"
        ],
        eligibility: "गर्भवती महिलाएं (4 महीने के बाद)। महीने की 9 तारीख को सरकारी अस्पताल जाएं।",
        process: [
          "अपने नजदीकी PHC/CHC पर पंजीकरण कराएं।",
          "ममता कार्ड (MCP Card) प्राप्त करें।",
          "महीने की 9 तारीख को सरकारी अस्पताल जाएं।",
          "'PMSMA' बैनर या हेल्प डेस्क खोजें।"
        ]
      },
      pmmvy: {
        name: "प्रधानमंत्री मातृ वंदना योजना (PMMVY)",
        desc: "पहले बच्चे के जन्म पर ₹5,000 की नकद सहायता।",
        benefits: [
          "पहली किस्त: ₹1,000 (पंजीकरण पर)।",
          "दूसरी किस्त: ₹2,000 (6 महीने की जांच के बाद)।",
          "तीसरी किस्त: ₹2,000 (बच्चे के जन्म और टीके के बाद)।"
        ],
        eligibility: "पहले जीवित बच्चे के लिए गर्भवती महिलाएं। आधार कार्ड और बैंक खाता जरूरी है।",
        process: [
          "अपनी आशा कार्यकर्ता या आंगनवाड़ी केंद्र (AWC) से संपर्क करें।",
          "फॉर्म 1-A भरें (पहली किस्त के लिए)।",
          "फॉर्म 1-B भरें (6 महीने की जांच के बाद)।",
          "फॉर्म 1-C भरें (जन्म पंजीकरण के बाद)।",
          "MCP कार्ड, आधार और बैंक पासबुक की कॉपी जमा करें।"
        ]
      },
      jsy: {
        name: "जननी सुरक्षा योजना (JSY)",
        desc: "अस्पताल में डिलीवरी (संस्थागत प्रसव) के लिए नकद सहायता।",
        benefits: [
          "ग्रामीण क्षेत्र: माँ को ₹1,400 + आशा को ₹600।",
          "शहरी क्षेत्र: माँ को ₹1,000 + आशा को ₹400।",
          "सरकारी अस्पताल में सुरक्षित प्रसव को बढ़ावा।"
        ],
        eligibility: "सरकारी स्वास्थ्य केंद्र में प्रसव कराने वाली सभी गर्भवती महिलाएं।",
        process: [
          "गर्भावस्था के दौरान आशा/ANM के पास पंजीकरण कराएं।",
          "JSY कार्ड / MCP कार्ड पास रखें।",
          "सरकारी अस्पताल या मान्यता प्राप्त निजी अस्पताल में डिलीवरी कराएं।",
          "डिलीवरी के बाद मेडिकल ऑफिसर को बैंक खाता विवरण दें।",
          "पैसा सीधे बैंक खाते में जमा किया जाता है।"
        ]
      },
      jssk: {
        name: "जननी शिशु सुरक्षा कार्यक्रम (JSSK)",
        desc: "माता और बीमार नवजात शिशु का शून्य खर्च (Zero Expense)।",
        benefits: [
          "मुफ्त डिलीवरी (नॉर्मल / सिझेरियन)।",
          "मुफ्त दवाइयां, जांच, खून और भोजन।",
          "मुफ्त परिवहन (घर से अस्पताल, रेफरल, और वापसी)।"
        ],
        eligibility: "सरकारी अस्पताल में प्रसव कराने वाली महिलाएं और बीमार नवजात शिशु (1 साल तक)।",
        process: [
          "किसी आवेदन पत्र की आवश्यकता नहीं है।",
          "डिलीवरी के लिए बस किसी भी सरकारी अस्पताल में जाएं।",
          "यदि दवा/जांच के पैसे मांगे जाएं, तो 104 हेल्पलाइन पर शिकायत करें।",
          "मुफ्त एम्बुलेंस सेवा के लिए 102/108 डायल करें।"
        ]
      },
      mkb: {
        name: "माझी कन्या भाग्यश्री (महाराष्ट्र)",
        desc: "लड़की के जन्म और शिक्षा के लिए आर्थिक सहायता।",
        benefits: [
          "1 लड़की के बाद नसबंदी पर ₹50,000 की FD।",
          "2 लड़कियों के बाद नसबंदी पर ₹25,000 प्रति लड़की।",
          "पैसा 18 साल के बाद मिलता है।"
        ],
        eligibility: "महाराष्ट्र के निवासी। BPL या आय 7.5 लाख से कम। नसबंदी प्रमाणपत्र अनिवार्य।",
        process: [
          "आंगनवाड़ी या ग्राम पंचायत में आवेदन करें।",
          "जन्म प्रमाणपत्र और आय प्रमाण पत्र के साथ फॉर्म भरें।",
          "माता या पिता का नसबंदी प्रमाण पत्र जमा करें।"
        ]
      },
      kanya: {
        name: "मुख्यमंत्री कन्या उत्थान योजना (बिहार)",
        desc: "जन्म से लेकर स्नातक तक लड़की को आर्थिक सहायता।",
        benefits: [
          "जन्म पर ₹2,000।",
          "1 साल के टीकाकरण के बाद ₹1,000।",
          "स्कूल जाने पर अलग राशि।",
          "कुल ₹50,000 तक का लाभ।"
        ],
        eligibility: "बिहार के स्थाई निवासी। एक परिवार में अधिकतम 2 बेटियां।",
        process: [
          "ई-कल्याण पोर्टल पर ऑनलाइन आवेदन करें।",
          "किंवा अंगणवाडी केंद्राद्वारे अर्ज करा.",
          "जन्म प्रमाणपत्र, बँक खाते, आई-वडिलांचे आधार आवश्यक."
        ]
      }
    },
    tracker: {
      tabs: {
        timeline: "मेरी समयरेखा",
        kicks: "बच्चे की हलचल",
        timer: "दर्द/कळा टाइमर",
        bag: "अस्पताल का बैग"
      },
      milestones: {
        title: "गर्भावस्था के पड़ाव",
        subtitle: "जैसे-जैसे पूरे हों, निशान लगाएं।",
        tt1: "टीटी इंजेक्शन (TT1)",
        tt2: "टीटी इंजेक्शन (TT2)",
        ifa: "आयरन गोली (100 दिन)",
        usg1: "शुरुआती सोनोग्राफी (11-14 सप्ताह)",
        usg2: "बड़ी सोनोग्राफी (18-22 सप्ताह)",
        anc1: "पहली जांच (तीसरा महीना)",
        anc2: "दूसरी जांच (पाचवां महीना)",
        anc3: "तीसरी जांच (सातवां महीना)",
        anc4: "चौथी जांच (नौवां महीना)",
        bag: "डिलीवरी बैग तैयार करें"
      },
      kicks: {
        title: "बच्चे की हलचल गिनें",
        desc: "1 घंटे तक हलचल गिनें। 10 बार हलचल होनी चाहिए। अगर कम हो, तो पानी पिएं, बाईं करवट ले और फिर से कोशिश करें।",
        start: "शुरू करें",
        tap: "हलचल गिनें (Tap)",
        finish: "समाप्त करें",
        history: "पुराना रिकॉर्ड",
        count: "हलचल",
        duration: "मिनट",
        great: "बहुत अच्छा!",
        low: "ध्यान दें",
      },
      timer: {
        title: "प्रसव दर्द टाइमर (कळा)",
        desc: "दर्द शुरू होने पर 'स्टार्ट' दबाएं। रुकने पर 'स्टॉप' दबाएं। यदि दर्द हर 5 मिनट में आए, तो अस्पताल जाएं।",
        start: "दर्द शुरू",
        stop: "दर्द रुका",
        duration: "समय (सेकंड)",
        freq: "अंतर (मिनट)",
        history: "पिछला दर्द",
        alert: "अस्पताल जाएं!",
        alertDesc: "दर्द बहुत जल्दी आ रहा है।"
      },
      bag: {
        title: "अस्पताल बैग सूची",
        subtitle: "8वें महीने तक ये सामान तैयार रखें।",
        categories: {
          docs: "दस्तावेज़",
          mom: "माँ के लिए",
          baby: "बच्चे के लिए"
        },
        items: {
          mcp: "ममता कार्ड (MCP Card)",
          id: "आधार कार्ड / पहचान पत्र",
          bank: "बैंक पासबुक (JSY के लिए)",
          ins: "आरोग्य कार्ड (Insurance)",
          clothes: "आरामदायक कपड़े (3 सेट)",
          towels: "तौलिया और पैड",
          toiletries: "साबुन, कंघी, तेल",
          slippers: "चप्पल",
          blanket: "बच्चे का कंबल",
          diapers: "कपड़े के लंगोट / डायपर",
          wipes: "सूती कपड़ा / वाइप्स",
          socks: "मोजे और टोपी"
        }
      },
      weekInfo: {
        title: "इस हफ्ते आपका बच्चा",
        desc: "बच्चा तेजी से बढ़ रहा है!",
      }
    }
  },
  mr: {
    appTitle: "मैट्री-केयर (MatriCare)",
    nav: {
      dashboard: "डॅशबोर्ड",
      riskScore: "जोखीम तपासणी",
      tracker: "माझा प्रवास",
      usg: "सोनोग्राफी",
      ctg: "बाळाचे ठोके",
      nutrition: "आहार",
      locator: "दवाखाना शोधा",
      schemes: "सरकारी योजना",
    },
    dashboard: {
      patientView: "माता विभाग",
      centerView: "डॉक्टर विभाग",
      greeting: "नमस्कार",
      progress: "गर्भावस्थेची प्रगती",
      week: "आठवडा",
      daysToGo: "दिवस बाकी",
      trimester: "तिमाही",
      nextCheckup: "पुढील तपासणी",
      getDirections: "पत्ता पहा",
      healthStatus: "आरोग्य स्थिती",
      stable: "तुमची तब्येत छान आहे.",
      emergency: "आपत्कालीन (Emergency)",
      emergencyDesc: "जास्त त्रास, रक्तस्त्राव किंवा हालचाल कमी?",
      callAmbulance: " रुग्णवाहिका 108",
      callAsha: "आशा ताईंना कॉल करा",
      logVitals: "आजची माहिती भरा",
      nutritionTip: "आजचा आहार",
      medicines: "औषधे",
      save: "जतन करा",
      weight: "वजन (किलो)",
      bp: "रक्तदाब (BP)",
      hb: "रक्ताचे प्रमाण (HB)",
    },
    risk: {
      title: "जोखीम तपासणी फॉर्म",
      patientProfile: "रुग्णाची माहिती",
      vitals: "तपासणी आणि मोजमाप",
      history: "इतिहास आणि धोके",
      calculate: "जोखीम तपासा",
      age: "आईचे वय",
      income: "उत्पन्न गट (रेशन कार्ड)",
      height: "उंची (से.मी.)",
      weight: "वजन (किलो)",
      bpLabel: "रक्तदाब (Blood Pressure)",
      bpGuide: [
        "रुग्णाला ५ मिनिटे शांत बसू द्या.",
        "हात हृदयाच्या पातळीवर ठेवा.",
        "वरचा (Sys) आणि खालचा (Dia) आकडा लिहा."
      ],
      fundalLabel: "पोटाचे माप (Fundal Height)",
      fundalGuide: [
        "रुग्णाला सरळ झोपवा.",
        "खालच्या हाडापासून गर्भाशयाच्या वरपर्यंत मोजा.",
        "टेप (से.मी.) वापरा."
      ],
      fhrLabel: "बाळाचे ठोके (FHR)",
      fhrGuide: [
        "पोटावर जेली लावा.",
        "डॉपलर बाळाच्या पाठीवर ठेवा.",
        "१ मिनिट ठोके मोजा."
      ],
      urineLabel: "लघवी तपासणी (Protein)",
      urineGuide: [
        "स्ट्रिप लघवीत बुडवा.",
        "१ मिनिट थांबा.",
        "रंग तपासा."
      ],
      hbLabel: "रक्ताचे प्रमाण (HB)",
      weeksLabel: "गर्भावस्थेचे आठवडे",
      parityLabel: "यापूर्वीची बाळंतपणे",
      symptoms: "धोक्याची लक्षणे",
      csection: "यापूर्वी सिझर झाले आहे का?",
      diabetes: "साखर (Diabetes)",
      swelling: "सूज (Edema)",
      bleeding: "रक्तस्त्राव",
      result: "निकाल",
      recommendation: "सल्ला",
      action: "पुढील कार्यवाही",
      diagrams: {
        cuff: "पट्टा",
        arm: "हात",
        bone: "हाड",
        top: "वर",
        tape: "टेप",
        doppler: "मशीन",
        jelly: "जेली",
        cup: "कप",
        strip: "स्ट्रिप"
      }
    },
    referral: {
      generate: "रेफरल पत्र तयार करा",
      title: "रेफरल नोट",
      dept: "माता आरोग्य विभाग",
      priority: "तातडीने हलवा (Urgent)",
      from: "प्रेषक (PHC)",
      to: "प्रति (मोठा दवाखाना)",
      phc: "प्राथमिक आरोग्य केंद्र (PHC)",
      dh: "जिल्हा रुग्णालय / FRU",
      reason: "रेफर करण्याचे कारण",
      clinical: "वैद्यकीय सारांश",
      vitals: "तपासणी अहवाल",
      print: "प्रिंट करा",
      close: "बंद करा"
    },
    usg: {
      title: "बाळाची वाढ (सोनोग्राफी)",
      description: "सोनोग्राफीचा फोटो अपलोड करा. AI बाळाच्या वाढीची (IUGR) तपासणी करेल.",
      clickUpload: "फोटो अपलोड करा",
      uploadFormat: "JPG, PNG स्वीकार्य",
      instructions: "सूचना:",
      instructionList: [
        "फोटोमध्ये मापांचा तक्ता दिसला पाहिजे.",
        "AI नंबर वाचून तपासणी करेल.",
        "जागतिक आरोग्य संघटनेचे मानक वापरले जातात."
      ],
      analyze: "तपासणी करा",
      processing: "तपासणी सुरू आहे...",
      diagnosis: "निदान",
      metrics: "मोजमाप (Metrics)",
      reasoning: "कारण आणि माहिती",
      guideTitle: "सोनोग्राफी फोटो कसा घ्यावा?",
      goodTitle: "योग्य पद्धत",
      badTitle: "अयोग्य पद्धत",
      goodTips: [
        "मापांच्या तक्त्याचा फोटो घ्या.",
        "खुणा (Calipers) स्पष्ट दिसल्या पाहिजेत."
      ],
      badTips: [
        "फ्लॅश बंद ठेवा, चमक नको.",
        "फोन स्थिर ठेवा, हलू देऊ नका."
      ]
    },
    ctg: {
      title: "बाळाचे ठोके (CTG)",
      description: "बाळाच्या हृदयाच्या ठोक्यांची माहिती भरा किंवा ग्राफ अपलोड करा.",
      manualTab: "मॅन्युअल फॉर्म",
      scanTab: "ग्राफ स्कॅन करा",
      uploadDesc: "CTG ग्राफचा स्पष्ट फोटो अपलोड करा.",
      extractBtn: "ग्राफमधून माहिती काढा",
      extracting: "ग्राफ वाचत आहे...",
      extracted: "माहिती मिळाली! कृपया खाली तपासा.",
      loadNormal: "सामान्य माहिती भरा",
      loadPathological: "धोक्याची माहिती भरा",
      labels: {
        baseline: "सरासरी ठोके (BPM)",
        accel: "वाढ (Accelerations)",
        movement: "बाळाची हालचाल",
        contractions: "कळा (Contractions)",
        lightDecel: "किरकोळ घट",
        severeDecel: "गंभीर घट",
        prolonged: "दीर्घकाळ घट",
        abnormalstv: "असामान्य STV %",
        meanstv: "सरासरी STV"
      },
      classify: "स्थिति तपासा",
      result: "स्थिती",
      confidence: "AI खात्री",
      charts: {
        trace: "ठोक्यांचा ग्राफ (अंदाजे)",
        events: "घटनाओं की संख्या"
      },
      guide: {
        title: "CTG ग्राफ कसा वाचावा?",
        baseline: "1. सरासरी ठोके (Baseline)",
        baselineDesc: "बाळ शांत असतानाची गती.",
        accel: "2. ठोके वाढणे (चांगले)",
        accelDesc: "रेषा वर जाते (डोंगरासारखी).",
        decel: "3. ठोके कमी होणे (धोका)",
        decelDesc: "कळांबरोबर ठोके कमी होतात (दरीसारखे)."
      }
    },
    locator: {
      title: "जवळचे PMSMA केंद्र",
      subtitle: "मोफत तपासणीसाठी सरकारी दवाखाना शोधा.",
      info: "PMSMA केंद्रांवर दर महिन्याच्या ९ तारखेला मोफत तपासणी होते.",
      searchPlaceholder: "शहर किंवा जिल्ह्याचे नाव लिहा...",
      searchButton: "शोधा",
      retryGps: "GPS पुन्हा प्रयत्न करा",
      useGps: "माझे ठिकाण वापरा",
      searching: "जवळचे दवाखाने शोधत आहे...",
      foundLocations: "सापडलेली ठिकाणे (Google Maps)",
      viewMap: "नकाशावर पहा",
      findNearMe: "जवळचे केंद्र शोधा"
    },
    nutrition: {
      title: "आहार सल्लागार (AI)",
      dietType: "आहाराचा प्रकार",
      trimester: "गर्भावस्थेचा काळ",
      conditions: "आरोग्य समस्या",
      generate: "आहार योजना बनवा",
      planTitle: "आजचे जेवण",
      richIn: "यात आहे",
      hydration: "पाण्याबद्दल सल्ला",
      avoid: "हे टाळा",
      types: {
        veg: "शाकाहारी",
        nonveg: "मांसाहारी",
        egg: "अंडा-शाकाहारी"
      },
      trimesters: {
        first: "पहिली तिमाही (१-३ महिने)",
        second: "दुसरी तिमाही (४-६ महिने)",
        third: "तीसरी तिमाही (७-९ महिने)"
      }
    },
    chatbot: {
      placeholder: "प्रश्न विचारा...",
      initial: "नमस्कार! मी 'मैट्री-बॉट' हूँ. मी तुमची काय मदत करू शकते?",
      status: "ऑनलाइन",
      listening: "ऐकत आहे..."
    },
    schemes: {
      pageTitle: "सरकारी योजना",
      subtitle: "पात्रता आणि अर्ज प्रक्रिया तपासा",
      stateLabel: "राज्य निवडा",
      centralLabel: "केंद्र सरकार (संपूर्ण भारत)",
      benefitsLabel: "फायदे",
      eligibilityLabel: "पात्रता आणि कागदपत्रे",
      processLabel: "अर्ज कसा करावा",
      disclaimer: "ही माहिती जनजागृतीसाठी आहे. अर्जासाठी कृपया तुमच्या आशा ताई किंवा PHC शी संपर्क साधा.",
      tabs: {
        all: "सर्व योजना",
        track: "माझे अर्ज"
      },
      tracker: {
        title: "अर्ज ट्रॅकर",
        empty: "तुम्ही सध्या कोणत्याही योजनेचा मागोवा घेत नाही आहात.",
        add: "ट्रॅकरमध्ये जोडा",
        update: "स्थिती बदला",
        remove: "काढून टाका",
        steps: {
          applied: "अर्ज सादर केला",
          verified: "कागदपत्रे तपासली",
          approved: "मंजूर",
          received: "लाभ मिळाला"
        }
      },
      recommender: {
        title: "तुमची पात्रता तपासा",
        desc: "योजनांचा लाभ घेण्यासाठी तुमची माहिती भरा.",
        children: "हयात मुले",
        category: "वर्गवारी (Category)",
        card: "रेशन कार्ड प्रकार",
        check: "योजना पहा",
        recommended: "शिफारस केलेले",
        options: {
          bpl: "BPL (पिवळे/केशरी)",
          apl: "APL (पांढरे)",
          sc: "SC / ST",
          gen: "General / OBC"
        }
      },
      pmsma: {
        name: "प्रधानमंत्री सुरक्षित मातृत्व अभियान (PMSMA)",
        desc: "दर महिन्याच्या ९ तारखेला मोफत प्रसूतीपूर्व तपासणी.",
        benefits: [
          "तज्ज्ञ डॉक्टरांकडून मोफत तपासणी.",
          "मोफत सोनोग्राफी, रक्त आणि लघवी तपासणी.",
          "जास्त जोखीम असलेल्या (High Risk) मातांची ओळख.",
          "MCP कार्डवर रंगीत स्टिकर."
        ],
        eligibility: "गर्भवती महिला (४ महिन्यांनंतर). महिन्याच्या ९ तारखेला सरकारी दवाखान्यात जा.",
        process: [
          "जवळच्या PHC/CHC मध्ये नोंदणी करा.",
          "ममता कार्ड (MCP Card) मिळवा.",
          "महिन्याच्या ९ तारखेला सरकारी दवाखान्यात जा.",
          "'PMSMA' बॅनर किंवा मदत कक्ष शोधा."
        ]
      },
      pmmvy: {
        name: "प्रधानमंत्री मातृ वंदना योजना (PMMVY)",
        desc: "पहिल्या बाळाच्या जन्मावर ₹५,००० ची रोख मदत.",
        benefits: [
          "पहिला हप्ता: ₹१,००० (नोंदणी झाल्यावर).",
          "दुसरा हप्ता: ₹२,००० (६ महिने तपासणी झाल्यावर).",
          "तीसरा हप्ता: ₹२,००० (बाळाच्या जन्मानंतर आणि लसीकरणानंतर)."
        ],
        eligibility: "पहिल्या जिवंत बाळासाठी गर्भवती महिला. आधार कार्ड आणि बँक खाते आवश्यक.",
        process: [
          "तुमच्या आशा ताई किंवा अंगणवाडी केंद्राशी संपर्क साधा.",
          "फॉर्म 1-A भरा (पहिल्या हप्त्यासाठी).",
          "फॉर्म 1-B भरा (६ महिन्यांच्या तपासणीनंतर).",
          "फॉर्म 1-C भरा (बाळाच्या जन्माच्या नोंदणीनंतर).",
          "MCP कार्ड, आधार आणि बँक पासबुकची प्रत जमा करा."
        ]
      },
      jsy: {
        name: "जननी सुरक्षा योजना (JSY)",
        desc: "दवाखान्यात प्रसूतीसाठी (Institutional Delivery) रोख मदत.",
        benefits: [
          "ग्रामीण भाग: मातेस ₹१,४०० + आशा ताईस ₹६००.",
          "शहरी भाग: मातेस ₹१,००० + आशा ताईस ₹४००.",
          "सरकारी दवाखान्यात सुरक्षित प्रसूतीला प्रोत्साहन."
        ],
        eligibility: "सरकारी आरोग्य केंद्रात प्रसूती करणाऱ्या सर्व महिला.",
        process: [
          "गर्भावस्थेत आशा/ANM कडे नोंदणी करा.",
          "JSY कार्ड / MCP कार्ड जवळ ठेवा.",
          "सरकारी किंवा मान्यताप्राप्त खाजगी रुग्णालयात प्रसूती करा.",
          "प्रसूतीनंतर वैद्यकीय अधिकाऱ्याला बँक खाते तपशील द्या.",
          "पैसे थेट बँक खात्यात जमा होतात."
        ]
      },
      jssk: {
        name: "जननी शिशु सुरक्षा कार्यक्रम (JSSK)",
        desc: "माता आणि आजारी नवजात बालकासाठी शून्य खर्च (Zero Expense).",
        benefits: [
          "मोफत प्रसूती (नॉर्मल / सिझेरियन).",
          "मोफत औषधे, तपासणी, रक्त आणि जेवण.",
          "मोफत वाहतूक (घरातून दवाखान्यात, आणि परत)."
        ],
        eligibility: "सरकारी दवाखान्यात प्रसूती करणाऱ्या महिला आणि आजारी नवजात बालके (१ वर्षापर्यंत).",
        process: [
          "कोणत्याही अर्जाची गरज नाही.",
          "प्रसूतीसाठी फक्त कोणत्याही सरकारी दवाखान्यात जा.",
          "औषध/चाचणीसाठी पैसे मागितल्यास १०४ हेल्पलाइनवर तक्रार करा.",
          "मोफत रुग्णवाहिकेसाठी १०२/१०८ डायल करा."
        ]
      },
      mkb: {
        name: "माझी कन्या भाग्यश्री (महाराष्ट्र)",
        desc: "मुलीच्या जन्मासाठी आणि शिक्षणासाठी आर्थिक मदत.",
        benefits: [
          "१ मुलीनंतर नसबंदी केल्यास ₹५०,००० ची FD.",
          "२ मुलींनंतर नसबंदी केल्यास प्रत्येकी ₹२५,०००.",
          "पैसे १८ वर्षांनंतर मिळतात."
        ],
        eligibility: "महाराष्ट्राचे रहिवासी. BPL किंवा उत्पन्न ७.५ लाखांपेक्षा कमी. नसबंदी प्रमाणपत्र आवश्यक.",
        process: [
          "अंगणवाडी किंवा ग्रामपंचायतीत अर्ज करा.",
          "जन्म प्रमाणपत्र आणि उत्पन्नाच्या दाखल्यासह अर्ज भरा.",
          "आई किंवा वडिलांचे नसबंदी प्रमाणपत्र जमा करा."
        ]
      },
      kanya: {
        name: "मुख्यमंत्री कन्या उत्थान योजना (बिहार)",
        desc: "जन्मापासून पदवीपर्यंत मुलीला आर्थिक मदत.",
        benefits: [
          "जन्मावर ₹२,०००.",
          "१ वर्षाच्या लसीकरणानंतर ₹१,०००.",
          "शाळेत गेल्यावर वेगळी रक्कम.",
          "एकूण ₹५०,००० पर्यंतचा लाभ."
        ],
        eligibility: "बिहारचे कायमस्वरूपी रहिवासी. एका कुटुंबात जास्तीत जास्त २ मुली.",
        process: [
          "ई-कल्याण पोर्टलवर ऑनलाइन अर्ज करा.",
          "किंवा अंगणवाडी केंद्राद्वारे अर्ज करा.",
          "जन्म प्रमाणपत्र, बँक खाते, आई-वडिलांचे आधार आवश्यक."
        ]
      }
    },
    tracker: {
      tabs: {
        timeline: "माझी वेळरेषा",
        kicks: "बाळाची हालचाल",
        timer: "कळा (Contraction Timer)",
        bag: "दवाखान्याची पिशवी"
      },
      milestones: {
        title: "गर्भावस्थेचे टप्पे",
        subtitle: "जसे पूर्ण होतील तसे टिक करा.",
        tt1: "टीटी इंजेक्शन (TT1)",
        tt2: "टीटी इंजेक्शन (TT2)",
        ifa: "लोह गोळ्या (१०० दिवस)",
        usg1: "पहिली सोनोग्राफी (११-१४ आठवडे)",
        usg2: "मोठी सोनोग्राफी (१८-२२ आठवडे)",
        anc1: "पहिली तपासणी (तीसरा महिना)",
        anc2: "दुसरी तपासणी (पाचवा महिना)",
        anc3: "तीसरी तपासणी (सातवा महिना)",
        anc4: "चौथी तपासणी (नववा महिना)",
        bag: "डिलिव्हरी बॅग तयार ठेवा"
      },
      kicks: {
        title: "बाळाची हालचाल मोजा",
        desc: "१ तास हालचाल मोजा. १० वेळा हालचाल झाली पाहिजे. कमी असल्यास पाणी प्या, डाव्या कुशीवर झोपा आणि पुन्हा प्रयत्न करा.",
        start: "सुरू करा",
        tap: "हालचाल मोजा (Tap)",
        finish: "पूर्ण करा",
        history: "जुना रेकॉर्ड",
        count: "हालचाल",
        duration: "मिनिटे",
        great: "खूप छान!",
        low: "लक्ष ठेवा",
      },
      timer: {
        title: "कळा मोजा (Timer)",
        desc: "कळा सुरू झाल्यावर 'स्टार्ट' दाबा. थांबल्यावर 'स्टॉप' दाबा. जर कळा दर ५ मिनिटांनी येत असतील तर दवाखान्यात जा.",
        start: "कळा सुरू",
        stop: "कळा थांबल्या",
        duration: "वेळ (सेकंद)",
        freq: "अंतर (मिनिटे)",
        history: "जुना रेकॉर्ड",
        alert: "दवाखान्यात जा!",
        alertDesc: "कळा खूप जवळ येत आहेत."
      },
      bag: {
        title: "दवाखान्याची पिशवी",
        subtitle: "८ व्या महिन्यापर्यंत हे साहित्य तयार ठेवा.",
        categories: {
          docs: "कागदपत्रे",
          mom: "आईसाठी",
          baby: "बाळासाठी"
        },
        items: {
          mcp: "ममता कार्ड (MCP Card)",
          id: "आधार कार्ड / ओळखपत्र",
          bank: "बँक पासबुक (JSY साठी)",
          ins: "आरोग्य कार्ड (Insurance)",
          clothes: "आरामदायी कपडे (३ जोड्या)",
          towels: "तौलिया आणि पॅड्स",
          toiletries: "साबण, कंगवा, तेल",
          slippers: "चप्पल",
          blanket: "बाळाचे पांघरूण",
          diapers: "लंगोट / डायपर",
          wipes: "सुती कापड / वाइप्स",
          socks: "मोजे आणि टोपी"
        }
      },
      weekInfo: {
        title: "या आठवड्यात तुमचे बाळ",
        desc: "बाळ वेगाने वाढत आहे!",
      }
    }
  }
};
