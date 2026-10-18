
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { KickRecord, ContractionRecord } from '../types';
import { Calendar, Baby, Footprints, Clock, CheckSquare, Play, Square, History, AlertTriangle, Smile, ChevronRight, Briefcase, Timer, CheckCircle, StopCircle, RefreshCw, Trash2, Settings, Edit2, CalendarDays } from 'lucide-react';
import { useClinicalContext } from '../contexts/ClinicalContext';

export const PregnancyTracker: React.FC = () => {
  const { t } = useLanguage();
  const { currentGestationalWeek, lmp, setLmp } = useClinicalContext();
  const [activeTab, setActiveTab] = useState<'timeline' | 'kicks' | 'timer' | 'bag'>('timeline');
  const [showSettings, setShowSettings] = useState(false);
  const [tempLmp, setTempLmp] = useState('');

  // --- Kick Counter Logic ---
  const [isCounting, setIsCounting] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [kickHistory, setKickHistory] = useState<KickRecord[]>([]);

  // Load history
  useEffect(() => {
    const savedKicks = localStorage.getItem('kick_history');
    if (savedKicks) {
      setKickHistory(JSON.parse(savedKicks));
    }
    
    // Contraction History
    const savedContractions = localStorage.getItem('contraction_history');
    if (savedContractions) setContractionHistory(JSON.parse(savedContractions));

    // Bag Checklist
    const savedBag = localStorage.getItem('hospital_bag');
    if (savedBag) setBagChecked(JSON.parse(savedBag));
  }, []);

  const startKickSession = () => {
    setIsCounting(true);
    setKickCount(0);
    setStartTime(Date.now());
  };

  const handleKickTap = () => {
    setKickCount(prev => prev + 1);
  };

  const finishKickSession = () => {
    if (!startTime) return;
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 60000); // in minutes

    const record: KickRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      count: kickCount,
      duration: duration || 1, // min 1 minute
      startTime: new Date(startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    const newHistory = [record, ...kickHistory];
    setKickHistory(newHistory);
    localStorage.setItem('kick_history', JSON.stringify(newHistory));
    
    setIsCounting(false);
    setStartTime(null);
    setKickCount(0);
  };

  // --- Contraction Timer Logic ---
  const [isContractionActive, setIsContractionActive] = useState(false);
  const [contractionStart, setContractionStart] = useState<number | null>(null);
  const [contractionHistory, setContractionHistory] = useState<ContractionRecord[]>([]);

  const toggleContraction = () => {
    if (!isContractionActive) {
      // Start
      setIsContractionActive(true);
      setContractionStart(Date.now());
    } else {
      // Stop
      if (!contractionStart) return;
      const endTime = Date.now();
      const durationSec = Math.round((endTime - contractionStart) / 1000);
      
      let frequencyMin = 0;
      if (contractionHistory.length > 0) {
        const lastStart = contractionHistory[0].startTime;
        frequencyMin = Math.round((contractionStart - lastStart) / 60000);
      }

      const record: ContractionRecord = {
        id: Date.now().toString(),
        startTime: contractionStart,
        endTime: endTime,
        durationSec,
        frequencyMin
      };

      const newHistory = [record, ...contractionHistory];
      setContractionHistory(newHistory);
      localStorage.setItem('contraction_history', JSON.stringify(newHistory));
      
      setIsContractionActive(false);
      setContractionStart(null);
    }
  };
  
  const clearContractions = () => {
    if(confirm("Clear history?")) {
      setContractionHistory([]);
      localStorage.setItem('contraction_history', '[]');
    }
  };

  // --- Hospital Bag Logic ---
  const [bagChecked, setBagChecked] = useState<string[]>([]);
  
  const toggleBagItem = (id: string) => {
    const newChecked = bagChecked.includes(id) 
      ? bagChecked.filter(i => i !== id) 
      : [...bagChecked, id];
    setBagChecked(newChecked);
    localStorage.setItem('hospital_bag', JSON.stringify(newChecked));
  };

  // --- Milestones Logic ---
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  
  useEffect(() => {
    const savedMs = localStorage.getItem('milestones');
    if (savedMs) {
      setCompletedMilestones(JSON.parse(savedMs));
    }
  }, []);

  const toggleMilestone = (id: string) => {
    const newMs = completedMilestones.includes(id) 
      ? completedMilestones.filter(m => m !== id)
      : [...completedMilestones, id];
    
    setCompletedMilestones(newMs);
    localStorage.setItem('milestones', JSON.stringify(newMs));
  };

  const handleLmpUpdate = () => {
     if (tempLmp) {
        setLmp(tempLmp);
        setShowSettings(false);
     }
  };

  const getMilestoneDate = (weekOffset: number) => {
     if (!lmp) return null;
     const d = new Date(lmp);
     d.setDate(d.getDate() + (weekOffset * 7));
     return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const milestones = [
    { id: 'anc1', label: t.tracker.milestones.anc1, week: 12 },
    { id: 'usg1', label: t.tracker.milestones.usg1, week: 12 },
    { id: 'tt1', label: t.tracker.milestones.tt1, week: 16 },
    { id: 'anc2', label: t.tracker.milestones.anc2, week: 20 },
    { id: 'usg2', label: t.tracker.milestones.usg2, week: 20 },
    { id: 'tt2', label: t.tracker.milestones.tt2, week: 24 },
    { id: 'anc3', label: t.tracker.milestones.anc3, week: 28 },
    { id: 'ifa', label: t.tracker.milestones.ifa, week: 30 },
    { id: 'anc4', label: t.tracker.milestones.anc4, week: 36 },
    { id: 'bag', label: t.tracker.milestones.bag, week: 37 },
  ];

  // Bag Items grouped
  const bagGroups = [
    { title: t.tracker.bag.categories.docs, items: ['mcp', 'id', 'bank', 'ins'] },
    { title: t.tracker.bag.categories.mom, items: ['clothes', 'towels', 'toiletries', 'slippers'] },
    { title: t.tracker.bag.categories.baby, items: ['blanket', 'diapers', 'wipes', 'socks'] },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <span className="bg-rose-100 text-rose-700 p-2 rounded-lg">
               <Footprints className="w-6 h-6" />
             </span>
             {t.nav.tracker}
           </h2>
        </div>

        <div className="bg-slate-100 p-1 rounded-lg inline-flex self-start border border-slate-200 overflow-x-auto max-w-full">
           <button
             onClick={() => setActiveTab('timeline')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'timeline' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Calendar className="w-4 h-4" /> {t.tracker.tabs.timeline}
           </button>
           <button
             onClick={() => setActiveTab('kicks')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'kicks' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Baby className="w-4 h-4" /> {t.tracker.tabs.kicks}
           </button>
           <button
             onClick={() => setActiveTab('timer')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'timer' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Timer className="w-4 h-4" /> {t.tracker.tabs.timer}
           </button>
           <button
             onClick={() => setActiveTab('bag')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'bag' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Briefcase className="w-4 h-4" /> {t.tracker.tabs.bag}
           </button>
        </div>
      </div>

      {activeTab === 'timeline' && (
        <div className="animate-in fade-in slide-in-from-left-4 space-y-6">
           
           {/* Current Status Card */}
           <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                 <div className="bg-white/20 p-4 rounded-full">
                    <Baby className="w-10 h-10 text-white" />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                       {t.dashboard.week} {currentGestationalWeek}
                       <button onClick={() => setShowSettings(!showSettings)} className="text-white/70 hover:text-white">
                          <Edit2 className="w-4 h-4" />
                       </button>
                    </h3>
                    <p className="text-rose-100">{t.tracker.weekInfo.title}</p>
                    
                    {/* Settings Panel for LMP */}
                    {showSettings && (
                       <div className="mt-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                          <label className="text-xs text-rose-100 uppercase font-bold block mb-1">Set Pregnancy Start (LMP Date)</label>
                          <div className="flex gap-2">
                             <input 
                                type="date" 
                                className="text-slate-800 rounded px-2 py-1 text-sm outline-none flex-1"
                                onChange={(e) => setTempLmp(e.target.value)}
                             />
                             <button onClick={handleLmpUpdate} className="bg-white text-rose-600 px-3 py-1 rounded text-sm font-bold hover:bg-rose-50">Save</button>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
              <div className="mt-4 bg-black/10 p-4 rounded-lg text-sm text-rose-50 leading-relaxed relative z-10">
                 {currentGestationalWeek < 13 ? "Baby is forming organs. Eat healthy and take folic acid." : 
                  currentGestationalWeek < 27 ? "Baby can hear sounds now! You might feel movements." :
                  "Baby is gaining weight. Get ready for delivery!"}
              </div>
              
              <Calendar className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white opacity-10 rotate-12" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{t.tracker.milestones.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{t.tracker.milestones.subtitle}</p>

              <div className="space-y-4">
                 {milestones.map((m) => {
                    const isDone = completedMilestones.includes(m.id);
                    const isUpcoming = !isDone && m.week > currentGestationalWeek;
                    const isOverdue = !isDone && m.week <= currentGestationalWeek;
                    const dueDate = getMilestoneDate(m.week);

                    return (
                       <div 
                         key={m.id} 
                         onClick={() => toggleMilestone(m.id)}
                         className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                            isDone ? 'bg-green-50 border-green-200 opacity-70' : 
                            isOverdue ? 'bg-orange-50 border-orange-200' :
                            'bg-white border-slate-100 hover:border-rose-200'
                         }`}
                       >
                          <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${
                             isDone ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'
                          }`}>
                             {isDone && <CheckSquare className="w-4 h-4 text-white" />}
                          </div>
                          
                          <div className="flex-1">
                             <h4 className={`font-semibold ${isDone ? 'text-green-800 line-through' : 'text-slate-800'}`}>
                                {m.label}
                             </h4>
                             <div className="flex flex-wrap gap-2 items-center mt-1">
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                   {t.dashboard.week} {m.week}
                                </span>
                                {dueDate && (
                                   <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                      <CalendarDays className="w-3 h-3" /> {dueDate}
                                   </span>
                                )}
                             </div>
                          </div>

                          {isOverdue && (
                             <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded font-bold">Due</span>
                          )}
                          {isUpcoming && (
                             <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Upcoming</span>
                          )}
                       </div>
                    );
                 })}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'kicks' && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
           
           <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div>
                 <h3 className="font-bold text-indigo-800">{t.tracker.kicks.title}</h3>
                 <p className="text-sm text-indigo-700 leading-relaxed mt-1">
                    {t.tracker.kicks.desc}
                 </p>
              </div>
           </div>

           {/* Counter Interface */}
           <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
              {!isCounting ? (
                 <button 
                   onClick={startKickSession}
                   className="w-48 h-48 rounded-full bg-rose-500 text-white shadow-xl hover:bg-rose-600 hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 mx-auto"
                 >
                    <Play className="w-12 h-12 ml-1" />
                    <span className="font-bold text-lg">{t.tracker.kicks.start}</span>
                 </button>
              ) : (
                 <div className="space-y-8">
                    <div className="text-6xl font-black text-rose-600 tabular-nums animate-in zoom-in">
                       {kickCount}
                    </div>
                    
                    <button 
                      onClick={handleKickTap}
                      className="w-full py-12 bg-rose-100 text-rose-700 rounded-2xl border-2 border-rose-300 active:bg-rose-200 transition-colors font-bold text-xl flex items-center justify-center gap-3"
                    >
                       <Footprints className="w-8 h-8" /> {t.tracker.kicks.tap}
                    </button>

                    <button 
                      onClick={finishKickSession}
                      className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center gap-2 mx-auto"
                    >
                       <Square className="w-4 h-4 fill-current" /> {t.tracker.kicks.finish}
                    </button>
                 </div>
              )}
           </div>

           {/* History */}
           {kickHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-500" />
                    <h3 className="font-bold text-slate-700">{t.tracker.kicks.history}</h3>
                 </div>
                 <div className="divide-y divide-slate-100">
                    {kickHistory.map((rec) => (
                       <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                          <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg ${rec.count >= 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {rec.count >= 10 ? <Smile className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                             </div>
                             <div>
                                <p className="font-bold text-slate-800">{new Date(rec.date).toLocaleDateString()} at {rec.startTime}</p>
                                <p className="text-xs text-slate-500">{rec.duration} {t.tracker.kicks.duration}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="text-xl font-bold text-slate-700">{rec.count}</span>
                             <p className="text-[10px] uppercase text-slate-400 font-bold">{t.tracker.kicks.count}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      )}

      {activeTab === 'timer' && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
           <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-700 mt-0.5" />
              <div>
                 <h3 className="font-bold text-yellow-800">{t.tracker.timer.title}</h3>
                 <p className="text-sm text-yellow-700 leading-relaxed mt-1">
                    {t.tracker.timer.desc}
                 </p>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
              <div className="mb-8">
                 <button 
                    onClick={toggleContraction}
                    className={`w-56 h-56 rounded-full shadow-xl transition-all flex flex-col items-center justify-center gap-3 mx-auto border-8 ${
                       isContractionActive 
                        ? 'bg-white border-red-500 text-red-600 animate-pulse' 
                        : 'bg-teal-600 border-teal-100 text-white hover:scale-105'
                    }`}
                 >
                    {isContractionActive ? <StopCircle className="w-16 h-16" /> : <Play className="w-16 h-16 ml-2" />}
                    <span className="font-bold text-xl">
                       {isContractionActive ? t.tracker.timer.stop : t.tracker.timer.start}
                    </span>
                 </button>
                 {isContractionActive && (
                    <p className="mt-6 text-red-500 font-mono text-xl font-bold animate-pulse">Timing...</p>
                 )}
              </div>

              {/* Alert Logic */}
              {contractionHistory.length >= 2 && contractionHistory[0].frequencyMin > 0 && contractionHistory[0].frequencyMin <= 5 && (
                 <div className="bg-red-500 text-white p-4 rounded-xl animate-bounce mb-6">
                    <h4 className="font-bold text-lg flex items-center justify-center gap-2">
                       <AlertTriangle className="w-6 h-6" /> {t.tracker.timer.alert}
                    </h4>
                    <p className="text-sm opacity-90">{t.tracker.timer.alertDesc}</p>
                 </div>
              )}
           </div>

           {contractionHistory.length > 0 && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-slate-500" />
                      <h3 className="font-bold text-slate-700">{t.tracker.timer.history}</h3>
                   </div>
                   <button onClick={clearContractions} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
                <div className="divide-y divide-slate-100">
                   {contractionHistory.map((rec) => (
                      <div key={rec.id} className="p-4 grid grid-cols-3 gap-4 text-center hover:bg-slate-50">
                         <div className="text-left">
                            <p className="font-bold text-slate-800">{new Date(rec.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                            <p className="text-xs text-slate-500">{new Date(rec.startTime).toLocaleDateString()}</p>
                         </div>
                         <div>
                            <span className="font-bold text-indigo-600">{rec.durationSec}s</span>
                            <p className="text-[10px] uppercase text-slate-400 font-bold">{t.tracker.timer.duration}</p>
                         </div>
                         <div>
                            <span className={`font-bold ${rec.frequencyMin <= 5 && rec.frequencyMin > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                               {rec.frequencyMin > 0 ? `${rec.frequencyMin} min` : '-'}
                            </span>
                            <p className="text-[10px] uppercase text-slate-400 font-bold">{t.tracker.timer.freq}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      )}

      {activeTab === 'bag' && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
           <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-purple-700 mt-0.5" />
              <div>
                 <h3 className="font-bold text-purple-800">{t.tracker.bag.title}</h3>
                 <p className="text-sm text-purple-700 mt-1">{t.tracker.bag.subtitle}</p>
              </div>
           </div>
           
           <div className="space-y-6">
              {bagGroups.map((group, idx) => (
                 <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                       {idx === 0 ? <CheckCircle className="w-4 h-4 text-blue-500" /> : idx === 1 ? <Smile className="w-4 h-4 text-pink-500" /> : <Baby className="w-4 h-4 text-orange-500" />}
                       {group.title}
                    </div>
                    <div className="p-2">
                       {group.items.map((itemKey) => {
                          const label = (t.tracker.bag.items as any)[itemKey];
                          const isChecked = bagChecked.includes(itemKey);
                          return (
                             <div 
                                key={itemKey} 
                                onClick={() => toggleBagItem(itemKey)}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isChecked ? 'bg-green-50' : 'hover:bg-slate-50'}`}
                             >
                                <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'}`}>
                                   {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
                                </div>
                                <span className={`flex-1 font-medium ${isChecked ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>
                                   {label}
                                </span>
                             </div>
                          )
                       })}
                    </div>
                 </div>
              ))}
           </div>

           <div className="flex justify-center">
              <div className="bg-white px-4 py-2 rounded-full shadow border border-slate-200 text-sm font-bold text-slate-600">
                 {bagChecked.length} / {Object.keys(t.tracker.bag.items).length} Items Packed
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
