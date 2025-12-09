
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClinicalData, RiskResult, USGResult, CTGFeatures, CTGResult, LocationSearchResult, GroundingChunk, DietPlan, Language } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
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
    model: "gemini-2.5-flash",
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
    Analyze this ultrasound image (or simulation thereof). Extract biometry metrics (BPD, HC, AC, FL, EFW).
    Determine if there is a risk of IUGR (FGR).
    Provide reasoning in simple English (medical terms are universal here).
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
    model: "gemini-2.5-flash",
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
    model: "gemini-2.5-flash",
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
    Analyze this Cardiotocography (CTG) paper trace image.
    
    Visually extract the key parameters from the graph:
    1. Baseline Heart Rate (Look at the FHR scale 60-200 bpm).
    2. Count Accelerations (Increases of >15 bpm for >15s).
    3. Count Uterine Contractions (Bottom graph).
    4. Count Decelerations (Dips in FHR matching or following contractions).
    5. Estimate Variability (STV).

    Return numeric estimations for the fields.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      baseline_heart_rate: { type: Type.NUMBER },
      accelerations: { type: Type.NUMBER },
      fetal_movement: { type: Type.NUMBER },
      uterine_contractions: { type: Type.NUMBER },
      light_decelerations: { type: Type.NUMBER },
      severe_decelerations: { type: Type.NUMBER },
      prolonged_decelerations: { type: Type.NUMBER },
      abnormal_short_term_variability: { type: Type.NUMBER },
      mean_value_of_short_term_variability: { type: Type.NUMBER },
    },
    required: ["baseline_heart_rate", "accelerations", "uterine_contractions"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
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
    model: "gemini-2.5-flash",
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
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: "You are MatriBot, a helpful and empathetic maternal health assistant for rural India. Answer questions about pregnancy, hygiene, nutrition, and government schemes (PMSMA, JSY). Reply in the same language as the user (English, Hindi, or Marathi). Use very simple words. If a symptom sounds dangerous (bleeding, severe pain), advise visiting a doctor immediately.",
    },
    history: history
  });

  const response = await chat.sendMessage({ message });
  return response.text || "I am unable to answer right now.";
};
