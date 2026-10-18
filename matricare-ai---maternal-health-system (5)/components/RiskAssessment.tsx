
import React, { useState, useEffect } from "react";
import { analyzeClinicalRisk } from "../services/geminiService";
import { ClinicalData, RiskResult } from "../types";
import { AlertTriangle, CheckCircle, Info, Loader2, Activity, Ruler, Heart, Droplet, Calculator, FileText, Printer, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useClinicalContext } from "../contexts/ClinicalContext";

// --- Custom Simple Illustrations ---

const BPIllustration = ({ t }: { t: any }) => (
  <svg viewBox="0 0 200 100" className="w-full h-full bg-white rounded-md border border-slate-100">
    <rect x="20" y="40" width="60" height="40" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
    <text x="50" y="65" fontSize="12" textAnchor="middle" fill="#475569" fontWeight="bold">{t.risk.diagrams.cuff}</text>
    <text x="50" y="30" fontSize="10" textAnchor="middle" fill="#475569">{t.risk.diagrams.arm}</text>
    <circle cx="140" cy="50" r="30" fill="white" stroke="#ef4444" strokeWidth="2" />
    <path d="M140 50 L140 30" stroke="#ef4444" strokeWidth="2" />
    <path d="M140 50 L155 60" stroke="#ef4444" strokeWidth="2" />
    <text x="140" y="95" fontSize="12" textAnchor="middle" fill="#ef4444" fontWeight="bold">BP</text>
    <path d="M80 60 C 100 60, 100 50, 110 50" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
  </svg>
);

const FundalHeightIllustration = ({ t }: { t: any }) => (
  <svg viewBox="0 0 200 250" className="w-full h-full bg-white rounded-md border border-slate-100">
    <path d="M60 50 Q 100 20 140 50 Q 180 150 100 220 Q 20 150 60 50" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
    <line x1="100" y1="220" x2="100" y2="50" stroke="#000" strokeWidth="2" strokeDasharray="5 5" />
    
    <circle cx="100" cy="220" r="5" fill="#333" />
    <text x="110" y="235" fontSize="12" fill="#333" fontWeight="bold">{t.risk.diagrams.bone} (0)</text>
    
    <circle cx="100" cy="50" r="5" fill="#333" />
    <text x="110" y="40" fontSize="12" fill="#333" fontWeight="bold">{t.risk.diagrams.top}</text>
    
    <rect x="90" y="100" width="20" height="60" rx="2" fill="#fbbf24" opacity="0.6" />
    <text x="130" y="130" fontSize="12" fill="#b45309" fontWeight="bold">{t.risk.diagrams.tape}</text>
  </svg>
);

const FHRIllustration = ({ t }: { t: any }) => (
  <svg viewBox="0 0 200 120" className="w-full h-full bg-white rounded-md border border-slate-100">
      <path d="M70 60 Q 100 40 130 60 Q 160 120 100 110 Q 40 120 70 60" fill="#fce7f3" stroke="#db2777" strokeWidth="1" />
      <rect x="80" y="40" width="30" height="50" rx="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
      <circle cx="95" cy="55" r="8" fill="#fff" opacity="0.8" />
      <path d="M95 90 L 95 100" stroke="#333" strokeWidth="2" />
      <text x="150" y="30" fontSize="12" fill="#1e40af" fontWeight="bold">{t.risk.diagrams.doppler}</text>
      <text x="95" y="115" fontSize="10" textAnchor="middle" fill="#333">{t.risk.diagrams.jelly}</text>
  </svg>
);

const UrineIllustration = ({ t }: { t: any }) => (
   <svg viewBox="0 0 200 100" className="w-full h-full bg-white rounded-md border border-slate-100">
     <rect x="50" y="20" width="30" height="60" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
     <rect x="120" y="40" width="60" height="15" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
     <rect x="130" y="42" width="10" height="11" fill="#22c55e" />
     <rect x="145" y="42" width="10" height="11" fill="#eab308" />
     <rect x="160" y="42" width="10" height="11" fill="#ef4444" />
     <text x="65" y="95" fontSize="12" textAnchor="middle" fontWeight="bold">{t.risk.diagrams.cup}</text>
     <text x="150" y="30" fontSize="12" textAnchor="middle" fontWeight="bold">{t.risk.diagrams.strip}</text>
     <path d="M75 50 L 120 48" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
   </svg>
);

// --- Reusable Layout Component for Input + Guide ---

interface InputWithGuideProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  guideSteps: string[];
  Illustration: React.FC<{ t: any }>;
  t: any;
}

const InputWithGuide: React.FC<InputWithGuideProps> = ({ label, icon, children, guideSteps, Illustration, t }) => {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Input Section */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase flex items-center gap-2">
             {icon} {label}
          </label>
          <div className="pt-1">
             {children}
          </div>
        </div>

        {/* Visual Guide Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-3 flex gap-4 shadow-sm h-full items-center">
          <div className="w-24 h-20 shrink-0">
             <Illustration t={t} />
          </div>
          <div className="min-w-0 flex-1">
             <div className="text-[10px] font-bold text-teal-700 uppercase mb-1 flex items-center gap-1">
                <Info className="w-3 h-3" /> Guide
             </div>
             <ul className="text-xs text-slate-600 space-y-1">
                {guideSteps.map((step, i) => (
                   <li key={i} className="flex items-start gap-1.5 leading-tight">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{step}</span>
                   </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export const RiskAssessment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [showReferral, setShowReferral] = useState(false);
  const { language, t } = useLanguage();
  const { vitals, bmi, setBmi, addVitals } = useClinicalContext();

  const [formData, setFormData] = useState<ClinicalData>({
    age: 25,
    height: 155,
    weight: 55,
    bmi: 22.9,
    socioEconomicStatus: "BPL (Below Poverty Line)",
    parity: 1,
    previousCSection: false,
    gestationalAge: 20,
    systolicBP: 120,
    diastolicBP: 80,
    fetalHeartRate: 140,
    fundalHeight: 20,
    hemoglobin: 11.5,
    urineProtein: "Negative",
    diabetes: false,
    multiplePregnancy: false,
    bleeding: false,
    edema: false,
    fundalHeightMismatch: false,
    otherRiskFactors: "",
  });

  // Sync with Global Clinical Context on mount or update
  useEffect(() => {
    if (vitals.length > 0) {
       const latest = vitals[vitals.length - 1];
       setFormData(prev => ({
          ...prev,
          weight: latest.weight,
          hemoglobin: latest.hb,
          // If BP string exists (120/80), parse it
          ...(latest.bp ? {
             systolicBP: parseInt(latest.bp.split('/')[0] || '120'),
             diastolicBP: parseInt(latest.bp.split('/')[1] || '80')
          } : {})
       }));
    }
  }, [vitals]);

  // Sync BMI from context
  useEffect(() => {
     setFormData(prev => ({ ...prev, bmi: bmi }));
  }, [bmi]);

  // Check Fundal Height Mismatch
  useEffect(() => {
    if (formData.gestationalAge > 12) {
      const diff = Math.abs(formData.fundalHeight - formData.gestationalAge);
      setFormData(prev => ({ ...prev, fundalHeightMismatch: diff > 2 }));
    }
  }, [formData.fundalHeight, formData.gestationalAge]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };
  
  // Calculate BMI and update context when height/weight change manually
  useEffect(() => {
     if (formData.height > 0 && formData.weight > 0) {
        setBmi(formData.height, formData.weight);
     }
  }, [formData.height, formData.weight]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Pass the current language to the AI service
      const analysis = await analyzeClinicalRisk(formData, language);
      setResult(analysis);
      
      // Update global history if risk is calculated successfully
      addVitals({
         weight: formData.weight,
         hb: formData.hemoglobin,
         bp: `${formData.systolicBP}/${formData.diastolicBP}`
      });

    } catch (error) {
      console.error(error);
      alert("Error calculating risk score.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-teal-100 text-teal-700 p-2 rounded-lg"><Activity className="w-5 h-5" /></span>
          {t.risk.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Patient Profile */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
              <span className="bg-slate-100 p-1 rounded">1</span> {t.risk.patientProfile}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">{t.risk.age}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">{t.risk.income}</label>
                <select name="socioEconomicStatus" value={formData.socioEconomicStatus} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900">
                  <option value="BPL">BPL (Yellow Card)</option>
                  <option value="APL">APL (White Card)</option>
                  <option value="Orange">Orange Card</option>
                </select>
              </div>
               <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">BMI</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                     <input type="number" placeholder="cm" name="height" value={formData.height} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 bg-white text-slate-900" />
                     <span className="text-[10px] text-slate-400">{t.risk.height}</span>
                  </div>
                  <div className="flex-1">
                     <input type="number" placeholder="kg" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 bg-white text-slate-900" />
                     <span className="text-[10px] text-slate-400">{t.risk.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Vitals & Measurements (With Inline Visual Guides) */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
              <span className="bg-slate-100 p-1 rounded">2</span> {t.risk.vitals}
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              
              {/* BP with Guide */}
              <InputWithGuide 
                 label={t.risk.bpLabel}
                 guideSteps={t.risk.bpGuide}
                 Illustration={BPIllustration}
                 t={t}
              >
                <div className="flex gap-2 items-center">
                   <input type="number" name="systolicBP" placeholder="Sys" value={formData.systolicBP} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 font-mono text-center text-lg" />
                   <span className="text-slate-400 text-xl">/</span>
                   <input type="number" name="diastolicBP" placeholder="Dia" value={formData.diastolicBP} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 font-mono text-center text-lg" />
                </div>
              </InputWithGuide>

              {/* Fundal Height with Guide */}
              <InputWithGuide
                 label={t.risk.fundalLabel}
                 icon={<Ruler className="w-4 h-4 text-slate-500" />}
                 guideSteps={t.risk.fundalGuide}
                 Illustration={FundalHeightIllustration}
                 t={t}
              >
                 <input type="number" name="fundalHeight" value={formData.fundalHeight} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 text-lg" />
                 {formData.fundalHeightMismatch && (
                   <div className="text-xs text-red-600 mt-2 flex items-center gap-1 font-bold bg-red-50 p-2 rounded">
                      <AlertTriangle className="w-4 h-4" /> Warning: Mismatch
                   </div>
                 )}
              </InputWithGuide>

              {/* FHR with Guide */}
              <InputWithGuide
                 label={t.risk.fhrLabel}
                 icon={<Heart className="w-4 h-4 text-pink-500" />}
                 guideSteps={t.risk.fhrGuide}
                 Illustration={FHRIllustration}
                 t={t}
              >
                 <input type="number" name="fetalHeartRate" value={formData.fetalHeartRate} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 text-lg" />
                 <div className="text-xs text-slate-500 mt-1">Normal: 110 - 160 bpm</div>
              </InputWithGuide>

              {/* Urine Protein with Guide */}
              <InputWithGuide
                 label={t.risk.urineLabel}
                 icon={<Droplet className="w-4 h-4 text-yellow-500" />}
                 guideSteps={t.risk.urineGuide}
                 Illustration={UrineIllustration}
                 t={t}
              >
                 <select name="urineProtein" value={formData.urineProtein} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 text-lg">
                     <option value="Negative">Negative (No)</option>
                     <option value="Trace">Trace</option>
                     <option value="1+">1+ (Cloudy)</option>
                     <option value="2+">2+</option>
                     <option value="3+">3+</option>
                     <option value="4+">4+</option>
                  </select>
              </InputWithGuide>

            </div>
          </div>

          {/* Section 3: History & Labs */}
          <div>
             <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
              <span className="bg-slate-100 p-1 rounded">3</span> {t.risk.history}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">{t.risk.weeksLabel}</label>
                <input type="number" name="gestationalAge" value={formData.gestationalAge} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">{t.risk.hbLabel}</label>
                <input type="number" step="0.1" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase">{t.risk.parityLabel}</label>
                <input type="number" name="parity" value={formData.parity} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" />
              </div>
              <div className="md:col-span-3">
                 <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{t.risk.symptoms}</label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-slate-50">
                       <input type="checkbox" name="previousCSection" checked={formData.previousCSection} onChange={handleChange} className="w-4 h-4 text-teal-600 rounded" />
                       <span className="text-sm">{t.risk.csection}</span>
                    </label>
                    <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-slate-50">
                       <input type="checkbox" name="diabetes" checked={formData.diabetes} onChange={handleChange} className="w-4 h-4 text-teal-600 rounded" />
                       <span className="text-sm">{t.risk.diabetes}</span>
                    </label>
                    <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-slate-50">
                       <input type="checkbox" name="edema" checked={formData.edema} onChange={handleChange} className="w-4 h-4 text-teal-600 rounded" />
                       <span className="text-sm">{t.risk.swelling}</span>
                    </label>
                    <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-slate-50">
                       <input type="checkbox" name="bleeding" checked={formData.bleeding} onChange={handleChange} className="w-4 h-4 text-teal-600 rounded" />
                       <span className="text-sm">{t.risk.bleeding}</span>
                    </label>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-teal-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-800 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Activity className="w-5 h-5" />}
              {t.risk.calculate}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className={`rounded-xl shadow-lg border p-6 animate-in fade-in slide-in-from-bottom-4 print:border-2 print:border-black ${
          result.category === 'High' ? 'bg-red-50 border-red-200' : 
          result.category === 'Moderate' ? 'bg-orange-50 border-orange-200' : 
          'bg-green-50 border-green-200'
        }`}>
          {/* Header for Print (Hidden in Referral Modal, specific to basic print) */}
          <div className="hidden print:block text-center mb-6 border-b pb-4">
             <h1 className="text-2xl font-bold">MatriCare Health Report</h1>
             <p className="text-sm">Govt. of India - Maternal Health Initiative</p>
             <p className="text-xs mt-1">Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full print:hidden ${
               result.category === 'High' ? 'bg-red-100 text-red-600' : 
               result.category === 'Moderate' ? 'bg-orange-100 text-orange-600' : 
               'bg-green-100 text-green-600'
            }`}>
               {result.category === 'High' ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
            </div>
            <div className="flex-1">
               <h3 className={`text-2xl font-bold ${
                  result.category === 'High' ? 'text-red-800' : 
                  result.category === 'Moderate' ? 'text-orange-800' : 
                  'text-green-800'
               }`}>
                  {result.category} {t.risk.result} (Score: {result.score})
               </h3>
               
               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <h4 className="font-bold text-slate-700 mb-2">{t.risk.recommendation}:</h4>
                     <p className="text-slate-700 leading-relaxed bg-white/60 p-3 rounded-lg border border-black/5">{result.recommendation}</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-700 mb-2">{t.risk.action}:</h4>
                     <div className="flex items-center gap-2 font-semibold text-slate-800 bg-white/60 p-3 rounded-lg border border-black/5">
                        <Activity className="w-4 h-4" />
                        {result.referralAction}
                     </div>
                  </div>
               </div>

                {/* Buttons Row */}
                <div className="mt-6 flex gap-4 print:hidden">
                    <button 
                        onClick={() => window.print()} 
                        className="text-sm text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
                    >
                        <Printer className="w-4 h-4" /> Print Basic Report
                    </button>

                    {/* Generate Referral Button for High/Moderate Risk */}
                    {(result.category === 'High' || result.category === 'Moderate') && (
                        <button
                            onClick={() => setShowReferral(true)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 underline font-bold flex items-center gap-1"
                        >
                            <FileText className="w-4 h-4" />
                            {t.referral.generate}
                        </button>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Referral Letter Modal */}
      {showReferral && result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 print:p-0 print:bg-white print:block">
              <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden print:shadow-none print:w-full print:h-full print:rounded-none">
                  {/* Toolbar */}
                  <div className="bg-slate-100 p-3 flex justify-between items-center border-b print:hidden">
                      <h3 className="font-bold text-slate-700">{t.referral.title}</h3>
                      <div className="flex gap-2">
                          <button onClick={() => window.print()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-700">
                              <Printer className="w-4 h-4" /> {t.referral.print}
                          </button>
                          <button onClick={() => setShowReferral(false)} className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-400">
                              <X className="w-4 h-4" /> {t.referral.close}
                          </button>
                      </div>
                  </div>

                  {/* Letter Content */}
                  <div className="p-8 space-y-6 text-slate-900 overflow-y-auto max-h-[85vh] print:max-h-none print:p-8">
                      {/* Header */}
                      <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-start">
                          <div>
                              <h1 className="text-2xl font-bold uppercase tracking-wide">{t.referral.title}</h1>
                              <p className="text-sm font-semibold text-slate-600">{t.referral.dept}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-xs text-slate-500">Date</p>
                              <p className="font-mono font-bold">{new Date().toLocaleDateString()}</p>
                              <p className="text-xs text-slate-500 mt-1">Ref ID: REF-{Date.now().toString().slice(-6)}</p>
                          </div>
                      </div>

                      {/* Urgent Banner */}
                      <div className="bg-red-50 border-2 border-red-200 p-3 text-center rounded print:border-red-500">
                          <p className="text-red-700 font-bold uppercase tracking-widest text-lg print:text-black">
                              {t.referral.priority} - {result.category} Risk
                          </p>
                      </div>

                      {/* To/From */}
                      <div className="grid grid-cols-2 gap-8 py-4">
                          <div>
                              <p className="text-xs text-slate-400 uppercase font-bold">{t.referral.from}</p>
                              <p className="font-bold text-lg">{t.referral.phc}</p>
                              <p className="text-sm">Sector 12, Jalgaon District</p>
                          </div>
                          <div>
                              <p className="text-xs text-slate-400 uppercase font-bold">{t.referral.to}</p>
                              <p className="font-bold text-lg">Medical Officer In-Charge</p>
                              <p className="text-sm font-semibold">{t.referral.dh}</p>
                          </div>
                      </div>

                      {/* Patient Details */}
                      <div className="bg-slate-50 p-4 rounded border border-slate-200 print:bg-white print:border-black">
                          <h4 className="font-bold text-slate-700 border-b border-slate-300 pb-2 mb-3 uppercase text-xs">{t.risk.patientProfile}</h4>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <div><span className="text-slate-500 w-24 inline-block">{t.risk.age}:</span> <b>{formData.age} Yrs</b></div>
                              <div><span className="text-slate-500 w-24 inline-block">{t.risk.weeksLabel}:</span> <b>{formData.gestationalAge} Wks</b></div>
                              <div><span className="text-slate-500 w-24 inline-block">{t.risk.parityLabel}:</span> <b>G{formData.parity} P{formData.parity - 1}</b></div>
                              <div><span className="text-slate-500 w-24 inline-block">Blood Group:</span> <b>Unknown</b></div>
                          </div>
                      </div>

                      {/* Clinical Summary */}
                      <div>
                          <h4 className="font-bold text-slate-700 border-b border-slate-300 pb-2 mb-3 uppercase text-xs">{t.referral.clinical}</h4>
                          <div className="grid grid-cols-3 gap-4 text-center mb-4">
                             <div className="border p-2 rounded">
                                <div className="text-xs text-slate-500">BP</div>
                                <div className="font-bold text-lg">{formData.systolicBP}/{formData.diastolicBP}</div>
                             </div>
                             <div className="border p-2 rounded">
                                <div className="text-xs text-slate-500">FHR</div>
                                <div className="font-bold text-lg">{formData.fetalHeartRate}</div>
                             </div>
                             <div className="border p-2 rounded">
                                <div className="text-xs text-slate-500">Hb</div>
                                <div className="font-bold text-lg">{formData.hemoglobin}</div>
                             </div>
                          </div>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                              {formData.urineProtein !== 'Negative' && <li><b>Urine Protein:</b> {formData.urineProtein}</li>}
                              {formData.edema && <li><b>Edema:</b> Present</li>}
                              {formData.bleeding && <li className="text-red-600 font-bold">Bleeding: Present</li>}
                              {formData.diabetes && <li><b>Diabetes History:</b> Yes</li>}
                              {formData.fundalHeightMismatch && <li><b>Fundal Height:</b> Mismatch detected ({formData.fundalHeight}cm vs {formData.gestationalAge}wks)</li>}
                          </ul>
                      </div>

                      {/* Reason */}
                      <div className="bg-slate-100 p-4 rounded print:bg-transparent print:border print:border-black">
                          <h4 className="font-bold text-slate-700 mb-2 uppercase text-xs">{t.referral.reason}</h4>
                          <p className="text-sm leading-relaxed font-medium">
                              {result.recommendation}
                          </p>
                          <p className="mt-2 text-sm font-bold">Action: {result.referralAction}</p>
                      </div>

                      {/* Signatures */}
                      <div className="pt-12 grid grid-cols-2 gap-8 mt-8">
                          <div className="text-center">
                              <div className="border-t border-slate-400 w-2/3 mx-auto pt-2"></div>
                              <p className="text-xs text-slate-500">Referred By (ANM/MO Signature)</p>
                          </div>
                          <div className="text-center">
                              <div className="border-t border-slate-400 w-2/3 mx-auto pt-2"></div>
                              <p className="text-xs text-slate-500">Received By (Hospital Stamp)</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
