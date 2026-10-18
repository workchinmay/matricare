
import React, { useState, useMemo, useRef } from "react";
import { analyzeCTGData, extractCTGFeaturesFromImage } from "../services/geminiService";
import { CTGFeatures, CTGResult } from "../types";
import { HeartPulse, FileSpreadsheet, Check, AlertCircle, Loader2, Info, UploadCloud, FileText, Activity } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, ReferenceLine 
} from "recharts";
import { useLanguage } from "../contexts/LanguageContext";

const CTGReadingGuide: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
         <Info className="w-5 h-5 text-teal-600" />
         {t.ctg.guide.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Card 1: Baseline */}
         <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
             <div className="h-32 mb-3 bg-white border border-slate-200 rounded p-2 relative overflow-hidden">
                 {/* SVG Grid */}
                 <svg width="100%" height="100%" viewBox="0 0 200 100">
                     <defs>
                         <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                         </pattern>
                     </defs>
                     <rect width="100%" height="100%" fill="url(#grid)" />
                     {/* Line around 50 (middle) */}
                     <path d="M 0 50 L 10 45 L 20 55 L 30 48 L 40 52 L 50 50 L 60 45 L 70 55 L 80 50 L 90 48 L 100 52 L 110 50 L 120 45 L 130 55 L 140 50 L 150 52 L 160 48 L 170 50 L 180 55 L 190 45 L 200 50" fill="none" stroke="#0f172a" strokeWidth="2" />
                     <line x1="0" y1="50" x2="200" y2="50" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" />
                 </svg>
                 <div className="absolute top-1/2 right-2 text-[10px] text-pink-600 font-bold bg-white px-1 shadow-sm border border-pink-100">Average</div>
             </div>
             <h4 className="font-bold text-slate-700 text-sm">{t.ctg.guide.baseline}</h4>
             <p className="text-xs text-slate-500 mt-1">{t.ctg.guide.baselineDesc}</p>
             <div className="mt-2 text-xs font-semibold text-green-700 bg-green-100 inline-block px-2 py-1 rounded">Normal: 110 - 160</div>
         </div>

         {/* Card 2: Accelerations */}
         <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="h-32 mb-3 bg-white border border-slate-200 rounded p-2 relative overflow-hidden">
                 <svg width="100%" height="100%" viewBox="0 0 200 100">
                     <defs>
                         <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                         </pattern>
                     </defs>
                     <rect width="100%" height="100%" fill="url(#grid2)" />
                     {/* Accel hump */}
                     <path d="M 0 60 L 20 62 L 40 58 L 50 60 L 60 40 L 80 20 L 100 25 L 120 40 L 140 60 L 160 58 L 180 62 L 200 60" fill="none" stroke="#22c55e" strokeWidth="2" />
                     <path d="M 60 60 L 60 20" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
                     <text x="70" y="30" fontSize="10" fill="#22c55e" fontWeight="bold">↑ UP 15 beats</text>
                 </svg>
              </div>
             <h4 className="font-bold text-slate-700 text-sm">{t.ctg.guide.accel}</h4>
             <p className="text-xs text-slate-500 mt-1">{t.ctg.guide.accelDesc}</p>
             <div className="mt-2 text-xs font-semibold text-teal-700 bg-teal-100 inline-block px-2 py-1 rounded">More is better</div>
         </div>

         {/* Card 3: Contractions & Decels */}
         <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
             <div className="h-32 mb-3 bg-white border border-slate-200 rounded p-2 relative overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 200 100">
                     <defs>
                         <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
                             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                         </pattern>
                     </defs>
                     <rect width="100%" height="100%" fill="url(#grid3)" />
                     {/* Top: Heart Rate DIPPING */}
                     <path d="M 0 30 L 50 30 Q 100 80 150 30 L 200 30" fill="none" stroke="#ef4444" strokeWidth="2" />
                     {/* Bottom: Contraction */}
                     <path d="M 0 90 L 50 90 Q 100 40 150 90 L 200 90" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5" />
                     <text x="10" y="20" fontSize="10" fill="#ef4444" fontWeight="bold">Heart Rate ↓</text>
                     <text x="10" y="85" fontSize="10" fill="#6366f1" fontWeight="bold">Contraction ↑</text>
                     <line x1="100" y1="30" x2="100" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                 </svg>
             </div>
             <h4 className="font-bold text-slate-700 text-sm">{t.ctg.guide.decel}</h4>
             <p className="text-xs text-slate-500 mt-1">{t.ctg.guide.decelDesc}</p>
             <div className="mt-2 text-xs font-semibold text-red-700 bg-red-100 inline-block px-2 py-1 rounded">Danger Sign</div>
         </div>
      </div>
    </div>
  );
};

export const CTGAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'manual' | 'scan'>('manual');
  
  // Logic State
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<CTGResult | null>(null);
  const [features, setFeatures] = useState<CTGFeatures>({
    baseline_heart_rate: 145,
    accelerations: 0,
    fetal_movement: 2,
    uterine_contractions: 5,
    light_decelerations: 3,
    severe_decelerations: 0,
    prolonged_decelerations: 0,
    abnormal_short_term_variability: 45,
    mean_value_of_short_term_variability: 0.8,
  });

  // Image Scan State
  const [scanImage, setScanImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeCTGData(features);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze CTG data.");
    } finally {
      setLoading(false);
    }
  };

  const fillNormal = () => {
     setFeatures({
        baseline_heart_rate: 130,
        accelerations: 5,
        fetal_movement: 10,
        uterine_contractions: 2,
        light_decelerations: 0,
        severe_decelerations: 0,
        prolonged_decelerations: 0,
        abnormal_short_term_variability: 10,
        mean_value_of_short_term_variability: 1.5,
     })
  }

  const fillPathological = () => {
     setFeatures({
        baseline_heart_rate: 100,
        accelerations: 0,
        fetal_movement: 0,
        uterine_contractions: 8,
        light_decelerations: 5,
        severe_decelerations: 2,
        prolonged_decelerations: 1,
        abnormal_short_term_variability: 75,
        mean_value_of_short_term_variability: 0.3,
     })
  }

  // --- Scan Logic ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScanImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractFromGraph = async () => {
    if (!scanImage) return;
    setScanning(true);
    try {
        const base64Data = scanImage.split(",")[1];
        const extractedFeatures = await extractCTGFeaturesFromImage(base64Data);
        setFeatures(prev => ({ ...prev, ...extractedFeatures }));
        alert(t.ctg.extracted);
        // Switch to manual tab to show results
        setActiveTab('manual');
    } catch (err) {
        console.error(err);
        alert("Failed to read graph. Please try a clearer image.");
    } finally {
        setScanning(false);
    }
  };

  const simulatedTraceData = useMemo(() => {
    const data = [];
    const points = 60;
    const baseline = features.baseline_heart_rate || 140;
    const variability = features.mean_value_of_short_term_variability || 1;

    for (let i = 0; i < points; i++) {
        let bpm = baseline;
        bpm += (Math.random() - 0.5) * (variability * 5);
        if (features.accelerations > 0 && i > 10 && i < 20) {
            bpm += 15 * Math.sin((i - 10) * 0.3);
        }
        const hasDecel = features.light_decelerations > 0 || features.severe_decelerations > 0 || features.prolonged_decelerations > 0;
        if (hasDecel && i > 35 && i < 50) {
            let depth = 0;
            if (features.severe_decelerations > 0) depth = 40;
            else if (features.prolonged_decelerations > 0) depth = 25;
            else if (features.light_decelerations > 0) depth = 15;
            bpm -= depth * Math.sin((i - 35) * 0.2);
        }
        data.push({ time: i, bpm: parseFloat(bpm.toFixed(1)) });
    }
    return data;
  }, [features]);

  const eventCountsData = useMemo(() => [
    { name: 'Accel', count: features.accelerations, fill: '#22c55e' },
    { name: 'Decel (L)', count: features.light_decelerations, fill: '#f59e0b' },
    { name: 'Decel (S)', count: features.severe_decelerations, fill: '#ef4444' },
    { name: 'Decel (P)', count: features.prolonged_decelerations, fill: '#b91c1c' },
    { name: 'Contractions', count: features.uterine_contractions, fill: '#6366f1' },
  ], [features]);


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-pink-100 text-pink-700 p-2 rounded-lg"><HeartPulse className="w-5 h-5" /></span>
          {t.ctg.title}
        </h2>
        <p className="text-slate-500 mb-6">{t.ctg.description}</p>
        
        {/* Tab Toggle */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-1">
           <button 
             onClick={() => setActiveTab('manual')}
             className={`px-4 py-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'manual' ? 'border-pink-500 text-pink-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
           >
              <FileText className="w-4 h-4" /> {t.ctg.manualTab}
           </button>
           <button 
             onClick={() => setActiveTab('scan')}
             className={`px-4 py-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'scan' ? 'border-pink-500 text-pink-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
           >
              <Activity className="w-4 h-4" /> {t.ctg.scanTab}
           </button>
        </div>

        {activeTab === 'manual' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                <div className="flex gap-2 mb-6">
                    <button onClick={fillNormal} className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium hover:bg-green-200">{t.ctg.loadNormal}</button>
                    <button onClick={fillPathological} className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium hover:bg-red-200">{t.ctg.loadPathological}</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.baseline}</label>
                            <input type="number" name="baseline_heart_rate" value={features.baseline_heart_rate} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.accel}</label>
                            <input type="number" name="accelerations" value={features.accelerations} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.movement}</label>
                            <input type="number" name="fetal_movement" value={features.fetal_movement} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.contractions}</label>
                            <input type="number" name="uterine_contractions" value={features.uterine_contractions} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.lightDecel}</label>
                            <input type="number" name="light_decelerations" value={features.light_decelerations} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.severeDecel}</label>
                            <input type="number" name="severe_decelerations" value={features.severe_decelerations} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.prolonged}</label>
                            <input type="number" name="prolonged_decelerations" value={features.prolonged_decelerations} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.abnormalstv}</label>
                            <input type="number" name="abnormal_short_term_variability" value={features.abnormal_short_term_variability} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase">{t.ctg.labels.meanstv}</label>
                            <input type="number" step="0.1" name="mean_value_of_short_term_variability" value={features.mean_value_of_short_term_variability} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md mt-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-slate-900" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button onClick={handleAnalyze} disabled={loading} className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 font-medium flex items-center gap-2">
                        {loading ? <Loader2 className="animate-spin" /> : <FileSpreadsheet className="w-5 h-5" />}
                        {t.ctg.classify}
                    </button>
                </div>
            </div>
        )}

        {activeTab === 'scan' && (
            <div className="animate-in fade-in slide-in-from-right-4">
                 <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 transition-colors">
                    {scanImage ? (
                       <div className="relative w-full max-w-md">
                          <img src={scanImage} alt="CTG Preview" className="rounded-lg shadow-md w-full object-contain bg-white" />
                          <button onClick={() => setScanImage(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                       </div>
                    ) : (
                      <div className="text-center" onClick={() => fileInputRef.current?.click()}>
                         <div className="bg-pink-50 p-4 rounded-full inline-block mb-3 cursor-pointer">
                            <UploadCloud className="w-8 h-8 text-pink-600" />
                         </div>
                         <p className="text-sm font-medium text-slate-700 cursor-pointer">{t.ctg.uploadDesc}</p>
                         <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                 </div>

                 <div className="mt-6 flex justify-center">
                    <button 
                       onClick={extractFromGraph} 
                       disabled={!scanImage || scanning} 
                       className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {scanning ? <Loader2 className="animate-spin" /> : <Activity className="w-5 h-5" />}
                        {scanning ? t.ctg.extracting : t.ctg.extractBtn}
                    </button>
                 </div>
            </div>
        )}
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className={`rounded-xl shadow-lg border p-6 ${
                result.classification === 'Pathological' ? 'bg-red-50 border-red-200' :
                result.classification === 'Suspicious' ? 'bg-orange-50 border-orange-200' :
                'bg-green-50 border-green-200'
            }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className={`text-2xl font-bold flex items-center gap-2 ${
                        result.classification === 'Pathological' ? 'text-red-700' :
                        result.classification === 'Suspicious' ? 'text-orange-700' :
                        'text-green-700'
                    }`}>
                        {result.classification === 'Pathological' && <AlertCircle className="w-6 h-6" />}
                        {result.classification === 'Normal' && <Check className="w-6 h-6" />}
                        {result.classification} {t.ctg.result}
                    </h3>
                </div>
                <div className="bg-white/60 p-4 rounded-lg border border-white/50 max-w-lg">
                    <p className="text-slate-700 italic">"{result.reasoning}"</p>
                </div>
                </div>
            </div>

            {/* Visual Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Simulated Trace */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <h4 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                        <HeartPulse className="w-4 h-4 text-pink-500" /> {t.ctg.charts.trace}
                    </h4>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={simulatedTraceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" hide />
                                <YAxis domain={['auto', 'auto']} fontSize={10} stroke="#94a3b8" />
                                <RechartsTooltip 
                                    labelFormatter={() => ''}
                                    formatter={(value: number) => [`${value} bpm`, 'FHR']}
                                />
                                <ReferenceLine y={160} stroke="red" strokeDasharray="3 3" label={{ value: 'Tachy', fontSize: 10, fill: 'red' }} />
                                <ReferenceLine y={110} stroke="red" strokeDasharray="3 3" label={{ value: 'Brady', fontSize: 10, fill: 'red' }} />
                                <Line 
                                    type="monotone" 
                                    dataKey="bpm" 
                                    stroke="#ec4899" 
                                    strokeWidth={2} 
                                    dot={false}
                                    activeDot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Feature Distribution */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <h4 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-blue-500" /> {t.ctg.charts.events}
                    </h4>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={eventCountsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#f1f5f9" />
                                <XAxis type="number" fontSize={10} stroke="#94a3b8" />
                                <YAxis type="category" dataKey="name" width={80} fontSize={10} stroke="#64748b" />
                                <RechartsTooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Guidance Section */}
      <CTGReadingGuide />
    </div>
  );
};
