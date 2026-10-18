
import React, { useState, useRef } from "react";
import { analyzeUSGImage } from "../services/geminiService";
import { USGResult } from "../types";
import { UploadCloud, Loader2, Ruler, Activity, Camera, CheckCircle, XCircle, Monitor, Smartphone, AlertTriangle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const USGGuidance: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-indigo-600" />
        {t.usg.guideTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Good Practice */}
         <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
               <CheckCircle className="w-4 h-4" /> {t.usg.goodTitle}
            </h4>
            <ul className="space-y-3">
               {t.usg.goodTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-white p-1.5 rounded-md border border-green-200 shrink-0">
                       {i === 0 ? <Monitor className="w-4 h-4 text-green-600" /> : <Ruler className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="text-sm text-green-900">
                       {tip}
                    </div>
                  </li>
               ))}
            </ul>
         </div>

         {/* Bad Practice */}
         <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
               <XCircle className="w-4 h-4" /> {t.usg.badTitle}
            </h4>
            <ul className="space-y-3">
               {t.usg.badTips.map((tip, i) => (
                 <li key={i} className="flex items-start gap-3">
                    <div className="bg-white p-1.5 rounded-md border border-red-200 shrink-0">
                       {i === 0 ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <Smartphone className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="text-sm text-red-900">
                       {tip}
                    </div>
                 </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  );
};

export const USGAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<USGResult | null>(null);
  const [isManual, setIsManual] = useState(false);
  const [manualMetrics, setManualMetrics] = useState({
    bpd: "",
    hc: "",
    ac: "",
    fl: "",
    efw: "",
    gestationalAge: ""
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Clear previous result
        setIsManual(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64Data = image.split(",")[1];
      const data = await analyzeUSGImage(base64Data);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.message || "Unknown error";
      alert(`Failed to analyze image: ${errorMessage}. You can enter values manually.`);
      setIsManual(true);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const metrics = {
      bpd: Math.round(parseFloat(manualMetrics.bpd) * 10) / 10 || 0,
      hc: Math.round(parseFloat(manualMetrics.hc) * 10) / 10 || 0,
      ac: Math.round(parseFloat(manualMetrics.ac) * 10) / 10 || 0,
      fl: Math.round(parseFloat(manualMetrics.fl) * 10) / 10 || 0,
      efw: Math.round(parseFloat(manualMetrics.efw)) || 0,
      gestationalAge: Math.round(parseFloat(manualMetrics.gestationalAge) * 10) / 10 || 0
    };

    // Simple heuristic for diagnosis
    let diagnosis: 'Normal Growth' | 'Suspected FGR' | 'Confirmed FGR' = 'Normal Growth';
    if (metrics.efw > 0 && metrics.efw < 1000 && metrics.gestationalAge > 32) {
      diagnosis = 'Suspected FGR';
    }

    setResult({
      metrics,
      diagnosis,
      reasoning: "Analysis based on manually entered biometry data."
    });
  };

  const handleRandomize = () => {
    // Random Gestational Age between 20 and 40 weeks
    const ga = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
    
    // Approximate biometry based on GA (very rough estimates for demo)
    const bpd = Math.round((ga * 2.5) * 10) / 10;
    const hc = Math.round((ga * 9) * 10) / 10;
    const ac = Math.round((ga * 8.5) * 10) / 10;
    const fl = Math.round((ga * 1.9) * 10) / 10;
    const efw = Math.round(Math.pow(ga, 2.8) / 15); // Rough weight estimate

    setManualMetrics({
      bpd: bpd.toString(),
      hc: hc.toString(),
      ac: ac.toString(),
      fl: fl.toString(),
      efw: efw.toString(),
      gestationalAge: ga.toString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg"><Activity className="w-5 h-5" /></span>
          {t.usg.title}
        </h2>
        <p className="text-slate-500 mb-6">
          {t.usg.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Upload Section */}
           <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 transition-colors">
              {image ? (
                 <div className="relative w-full">
                    <img src={image} alt="USG Preview" className="rounded-lg shadow-md w-full max-h-64 object-cover" />
                    <button onClick={() => { setImage(null); setResult(null); }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                 </div>
              ) : (
                <div className="text-center" onClick={() => fileInputRef.current?.click()}>
                   <div className="bg-indigo-50 p-4 rounded-full inline-block mb-3 cursor-pointer">
                      <UploadCloud className="w-8 h-8 text-indigo-600" />
                   </div>
                   <p className="text-sm font-medium text-slate-700 cursor-pointer">{t.usg.clickUpload}</p>
                   <p className="text-xs text-slate-400 mt-1">{t.usg.uploadFormat}</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
           </div>

           {/* Action Section */}
           <div className="flex flex-col justify-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                 <p className="font-semibold mb-1">{t.usg.instructions}</p>
                 <ul className="list-disc pl-4 space-y-1">
                    {t.usg.instructionList.map((item, i) => (
                       <li key={i}>{item}</li>
                    ))}
                 </ul>
              </div>
              <button 
                 onClick={handleAnalyze} 
                 disabled={!image || loading}
                 className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                 {loading ? <Loader2 className="animate-spin" /> : <Ruler className="w-5 h-5" />}
                 {loading ? t.usg.processing : t.usg.analyze}
              </button>

              <div className="flex gap-2">
                <button 
                   onClick={() => setIsManual(!isManual)}
                   className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                   {isManual ? "Hide Manual Entry" : "Enter Manually"}
                </button>
                <button 
                   onClick={() => {
                     setResult({
                       metrics: {
                         bpd: 72,
                         hc: 260,
                         ac: 240,
                         fl: 54,
                         efw: 1250,
                         gestationalAge: 28.4
                       },
                       diagnosis: 'Normal Growth',
                       reasoning: 'Sample data provided for demonstration. All metrics are within the expected range for 28 weeks of gestation.'
                     });
                   }}
                   className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                   Try with Demo Data
                </button>
              </div>
           </div>
        </div>

        {isManual && (
          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Manual Biometry Entry</h3>
              <button 
                type="button"
                onClick={handleRandomize}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded"
              >
                <Activity className="w-3 h-3" /> Randomize Values
              </button>
            </div>
            <form onSubmit={handleManualSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">BPD (mm)</label>
                <input 
                  type="number" 
                  value={manualMetrics.bpd}
                  onChange={(e) => setManualMetrics({...manualMetrics, bpd: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 72"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">HC (mm)</label>
                <input 
                  type="number" 
                  value={manualMetrics.hc}
                  onChange={(e) => setManualMetrics({...manualMetrics, hc: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 260"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">AC (mm)</label>
                <input 
                  type="number" 
                  value={manualMetrics.ac}
                  onChange={(e) => setManualMetrics({...manualMetrics, ac: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 240"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">FL (mm)</label>
                <input 
                  type="number" 
                  value={manualMetrics.fl}
                  onChange={(e) => setManualMetrics({...manualMetrics, fl: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 54"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">EFW (g)</label>
                <input 
                  type="number" 
                  value={manualMetrics.efw}
                  onChange={(e) => setManualMetrics({...manualMetrics, efw: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 1250"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">GA (Weeks)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={manualMetrics.gestationalAge}
                  onChange={(e) => setManualMetrics({...manualMetrics, gestationalAge: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 28.4"
                />
              </div>
              <div className="col-span-full mt-2">
                <button 
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Generate Analysis from Manual Data
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
           <div className={`p-4 border-b ${
              result.diagnosis === 'Normal Growth' ? 'bg-green-50 border-green-200 text-green-800' : 
              result.diagnosis === 'Suspected FGR' ? 'bg-orange-50 border-orange-200 text-orange-800' :
              'bg-red-50 border-red-200 text-red-800'
           }`}>
              <h3 className="text-lg font-bold flex items-center gap-2">
                 {t.usg.diagnosis}: {result.diagnosis}
              </h3>
           </div>
           
           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Ruler className="w-4 h-4" /> {t.usg.metrics}
                 </h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                       <span className="text-xs text-slate-500 uppercase">BPD</span>
                       <p className="text-lg font-mono font-medium">{(result.metrics.bpd && result.metrics.bpd > 0) ? Math.round(result.metrics.bpd * 10) / 10 : '--'} mm</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                       <span className="text-xs text-slate-500 uppercase">HC</span>
                       <p className="text-lg font-mono font-medium">{(result.metrics.hc && result.metrics.hc > 0) ? Math.round(result.metrics.hc * 10) / 10 : '--'} mm</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                       <span className="text-xs text-slate-500 uppercase">AC</span>
                       <p className="text-lg font-mono font-medium">{(result.metrics.ac && result.metrics.ac > 0) ? Math.round(result.metrics.ac * 10) / 10 : '--'} mm</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                       <span className="text-xs text-slate-500 uppercase">FL</span>
                       <p className="text-lg font-mono font-medium">{(result.metrics.fl && result.metrics.fl > 0) ? Math.round(result.metrics.fl * 10) / 10 : '--'} mm</p>
                    </div>
                    <div className="col-span-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                       <span className="text-xs text-indigo-500 uppercase">Estimated Fetal Weight (EFW)</span>
                       <p className="text-xl font-mono font-bold text-indigo-700">{(result.metrics.efw && result.metrics.efw > 0) ? Math.round(result.metrics.efw) : '--'} g</p>
                    </div>
                 </div>
              </div>
              
              <div>
                 <h4 className="font-semibold text-slate-700 mb-4">{t.usg.reasoning}</h4>
                 <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {result.reasoning}
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* Guidance Section */}
      <USGGuidance />
    </div>
  );
};
