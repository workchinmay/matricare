
// Add type declaration to avoid "process is not defined" error during build
declare const process: any;

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClinicalData, RiskResult, USGResult, CTGFeatures, CTGResult, LocationSearchResult, GroundingChunk, DietPlan, Language } from "../types";

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key not found. Please ensure GEMINI_API_KEY is set in your environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeClinicalRisk = async (data: ClinicalData, language: Language = 'en'): Promise<RiskResult> => {
  const ai = getAiClient();
  
  const prompt = `
    Analyze the following maternal clinical data and calculate a risk score.
    
    Patient Profile:
    - Age: ${data.age}
    - Socio-Economic Status: ${data.socioEconomicStatus}
    - BMI: ${data.bmi.toFixed(1)}
    
    Obstetric Status:
    - Gestational Age: ${data.gestationalAge} weeks
    - Parity: ${data.parity}
    - Previous C-Section: ${data.previousCSection}
    
    Vitals:
    - BP: ${data.systolicBP}/${data.diastolicBP} mmHg
    - FHR: ${data.fetalHeartRate} bpm
    - Fundal Height: ${data.fundalHeight} cm
    
    Labs/Symptoms:
    - Hb: ${data.hemoglobin} g/dL
    - Urine Protein: ${data.urineProtein}
    - Diabetes: ${data.diabetes}
    - Edema: ${data.edema}
    - Bleeding: ${data.bleeding}

    Output instructions:
    1. Calculate risk score (0-10).
    2. Determine Category (Low/Moderate/High).
    3. Provide "recommendation" and "referralAction" in ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'} language.
    4. Use very simple, easy-to-understand words for the recommendation (e.g., instead of "Edema", say "Swelling/Sujan").
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.INTEGER },
      category: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
      recommendation: { type: Type.STRING },
      referralAction: { type: Type.STRING },
    },
    required: ["score", "category", "recommendation", "referralAction"],
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as RiskResult;
  }
  throw new Error("Failed to analyze clinical data");
};

export const analyzeUSGImage = async (base64Image: string): Promise<USGResult> => {
  const ai = getAiClient();

  const prompt = `
    You are a world-class Obstetric Radiologist and high-precision OCR expert. 
    Analyze the provided ultrasound (USG) image and extract fetal biometry data.
    
    ### STEP 1: SCAN FOR MEASUREMENTS
    Look for a table or list containing fetal biometry. Common labels:
    - BPD (Biparietal Diameter)
    - HC (Head Circumference)
    - AC (Abdominal Circumference)
    - FL (Femur Length)
    - EFW (Estimated Fetal Weight)
    - GA (Gestational Age)
    
    ### STEP 2: EXTRACT NUMBERS
    - Extract the numeric values. 
    - If a value is in cm, convert to mm (multiply by 10).
    - If EFW is in kg, convert to g (multiply by 1000).
    - If GA is "28w 3d", return 28.4.
    
    ### STEP 3: BE EXTREMELY AGGRESSIVE
    - Even if the text is blurry or the table is hard to find, you MUST try to extract or estimate the values.
    - Look for any numbers followed by 'mm', 'cm', or 'g'.
    - If a specific metric is missing but others are present, use the Gestational Age (GA) to estimate the missing metric based on standard fetal growth charts.
    - YOUR GOAL IS TO PROVIDE VALUES. Do not return null or 0 if you can make a reasonable clinical estimate from the context of the image.
    - If you see a list of numbers without labels, try to map them to BPD, HC, AC, FL in that order (common report format).
    
    ### STEP 4: DIAGNOSIS
    - Classify as "Normal Growth", "Suspected FGR", or "Confirmed FGR".
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      metrics: {
        type: Type.OBJECT,
        properties: {
          bpd: { type: Type.NUMBER },
          hc: { type: Type.NUMBER },
          ac: { type: Type.NUMBER },
          fl: { type: Type.NUMBER },
          efw: { type: Type.NUMBER },
          gestationalAge: { type: Type.NUMBER },
        },
      },
      diagnosis: { type: Type.STRING, enum: ["Normal Growth", "Suspected FGR", "Confirmed FGR"] },
      reasoning: { type: Type.STRING },
    },
    required: ["metrics", "diagnosis", "reasoning"],
  };

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as USGResult;
  }
  throw new Error("Failed to analyze USG");
};

export const analyzeCTGData = async (features: CTGFeatures): Promise<CTGResult> => {
  const ai = getAiClient();

  const prompt = `
    Classify the Fetal Heart Rate trace based on these extracted features.
    Classify as Normal, Suspicious, or Pathological according to FIGO guidelines.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      classification: { type: Type.STRING, enum: ["Normal", "Suspicious", "Pathological"] },
      confidence: { type: Type.NUMBER },
      reasoning: { type: Type.STRING },
    },
    required: ["classification", "confidence", "reasoning"],
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as CTGResult;
  }
  throw new Error("Failed to analyze CTG");
};

export const extractCTGFeaturesFromImage = async (base64Image: string): Promise<CTGFeatures> => {
  const ai = getAiClient();

  const prompt = `
    You are an expert in Fetal Monitoring. Analyze this Cardiotocography (CTG) paper trace image.
    
    The image contains two main graphs:
    - Top Graph: Fetal Heart Rate (FHR) in bpm (usually 60-200 scale).
    - Bottom Graph: Uterine Activity (UA) / Contractions (usually 0-100 scale).

    Please extract the following parameters:
    1. Baseline FHR: The mean level of the FHR when stable (excluding accelerations/decelerations).
    2. Accelerations: Number of transient increases in FHR (>15 bpm for >15s).
    3. Uterine Contractions: Number of peaks in the bottom graph over the trace duration.
    4. Decelerations: Number of transient decreases in FHR.
    5. Variability: Estimate the bandwidth of the FHR signal (Short Term Variability).

    Return numeric estimations for all fields. If a field is not detectable, return null or a reasonable clinical estimate if possible, but prioritize accuracy.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      baseline_heart_rate: { type: Type.NUMBER, nullable: true },
      accelerations: { type: Type.NUMBER, nullable: true },
      fetal_movement: { type: Type.NUMBER, nullable: true },
      uterine_contractions: { type: Type.NUMBER, nullable: true },
      light_decelerations: { type: Type.NUMBER, nullable: true },
      severe_decelerations: { type: Type.NUMBER, nullable: true },
      prolonged_decelerations: { type: Type.NUMBER, nullable: true },
      abnormal_short_term_variability: { type: Type.NUMBER, nullable: true },
      mean_value_of_short_term_variability: { type: Type.NUMBER, nullable: true },
    },
    required: ["baseline_heart_rate", "accelerations", "uterine_contractions"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as CTGFeatures;
  }
  throw new Error("Failed to extract features from CTG image");
};

export const findNearbyMedicalCenters = async (
  location: { lat?: number; lon?: number; query?: string },
  language: Language = 'en'
): Promise<LocationSearchResult> => {
  const ai = getAiClient();
  
  const langName = language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English';

  const prompt = `
    Find the 5 nearest government hospitals, Community Health Centers (CHC), District Hospitals, or Primary Health Centers (PHC)
    ${location.query ? `near ${location.query}` : "relative to the user's current location"}.
    Focus on facilities likely to offer maternity services (Pradhan Mantri Surakshit Matritva Abhiyan - PMSMA).
    
    Important: Provide the output details (Hospital Name, Address, etc.) in ${langName} if possible, or keep names in English but describe address in ${langName}.
    
    For each center, strictly follow this format:
    
    1. **[Name of Hospital]**
       * **Address:** [Full Address with Pincode]
       * **Distance:** [Approximate Distance]
       
    Make sure the address is accurate and complete.
  `;

  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  if (location.lat !== undefined && location.lon !== undefined && !location.query) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.lat,
          longitude: location.lon,
        },
      },
    };
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: config,
  });

  return {
    text: response.text || "No information found.",
    groundingChunks: (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [],
  };
};

export const generateDietPlan = async (
  preference: string, 
  trimester: string, 
  conditions: string[],
  language: Language = 'en'
): Promise<DietPlan> => {
  const ai = getAiClient();

  const prompt = `
    Generate a 1-day sample Indian diet plan for a pregnant woman.
    
    Context:
    - Dietary Preference: ${preference}
    - Pregnancy Stage: ${trimester}
    - Medical Conditions: ${conditions.join(", ") || "None"}
    
    Requirements:
    - Respond in ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}.
    - Use locally available Indian ingredients.
    - Provide a hydration tip.
    - List 3 specific foods to avoid.
    - Important: For the JSON structure keys (time, name, description), keep the keys in English, but the VALUES should be in ${language}.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      meals: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            nutrients: { type: Type.STRING },
          }
        }
      },
      hydrationTip: { type: Type.STRING },
      avoidList: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["meals", "hydrationTip", "avoidList"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as DietPlan;
  }
  throw new Error("Failed to generate diet plan");
};

export const chatWithMatriBot = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  const ai = getAiClient();
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are MatriBot, a helpful and empathetic maternal health assistant for rural India. Answer questions about pregnancy, hygiene, nutrition, and government schemes (PMSMA, JSY). Reply in the same language as the user (English, Hindi, or Marathi). Use very simple words. If a symptom sounds dangerous (bleeding, severe pain), advise visiting a doctor immediately.",
    },
    history: history
  });

  const response = await chat.sendMessage({ message });
  return response.text || "I am unable to answer right now.";
};
