



import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Landmark, CheckCircle, FileText, IndianRupee, Calendar, Truck, ClipboardList, Sparkles, ArrowRight, PlusCircle, LayoutList, History, Filter, Map, Trash2 } from 'lucide-react';

interface TrackedApplication {
  schemeId: string;
  status: 'applied' | 'verified' | 'approved' | 'received';
  dateAdded: string;
}

export const GovernmentSchemes: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'track'>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const [formData, setFormData] = useState({
    children: 0,
    category: 'gen',
    card: 'apl'
  });

  const [showRecs, setShowRecs] = useState(false);
  const [trackedApps, setTrackedApps] = useState<TrackedApplication[]>([]);

  // Load tracked apps from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tracked_schemes');
    if (saved) {
      try {
        setTrackedApps(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse tracked schemes');
      }
    }
  }, []);

  // Save to local storage whenever trackedApps changes
  useEffect(() => {
    localStorage.setItem('tracked_schemes', JSON.stringify(trackedApps));
  }, [trackedApps]);

  const addToTracker = (schemeId: string) => {
    if (!trackedApps.find(app => app.schemeId === schemeId)) {
      setTrackedApps(prev => [...prev, {
        schemeId,
        status: 'applied',
        dateAdded: new Date().toISOString()
      }]);
      setActiveTab('track');
    }
  };

  const removeFromTracker = (schemeId: string) => {
    if (window.confirm("Are you sure you want to stop tracking this scheme?")) {
      setTrackedApps(prev => prev.filter(app => app.schemeId !== schemeId));
    }
  };

  const updateStatus = (schemeId: string, newStatus: TrackedApplication['status']) => {
    setTrackedApps(prev => prev.map(app => 
      app.schemeId === schemeId ? { ...app, status: newStatus } : app
    ));
  };

  const getRecommendedSchemes = () => {
     const recs = ['jssk']; // Everyone is eligible for JSSK in govt facility
     
     // PMMVY: Only for first living child
     if (formData.children === 0) {
        recs.push('pmmvy');
     }

     // JSY: Everyone in Govt facility, but specifically targeted at BPL/SC/ST
     recs.push('jsy');
     
     // PMSMA: Everyone
     recs.push('pmsma');

     // State specific logic
     if (selectedState === 'mh') recs.push('mkb');
     if (selectedState === 'br') recs.push('kanya');

     return recs;
  };

  const recommendedIds = getRecommendedSchemes();

  const schemes = [
    {
      id: 'pmsma',
      state: 'all',
      icon: <Calendar className="w-8 h-8 text-pink-600" />,
      color: 'bg-pink-50 border-pink-200',
      titleColor: 'text-pink-800',
      data: t.schemes.pmsma
    },
    {
      id: 'pmmvy',
      state: 'all',
      icon: <IndianRupee className="w-8 h-8 text-orange-600" />,
      color: 'bg-orange-50 border-orange-200',
      titleColor: 'text-orange-800',
      data: t.schemes.pmmvy
    },
    {
      id: 'jsy',
      state: 'all',
      icon: <Landmark className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      titleColor: 'text-blue-800',
      data: t.schemes.jsy
    },
    {
      id: 'jssk',
      state: 'all',
      icon: <Truck className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-200',
      titleColor: 'text-green-800',
      data: t.schemes.jssk
    },
    // State Specific Schemes
    {
      id: 'mkb',
      state: 'mh',
      icon: <AwardBadge className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      titleColor: 'text-purple-800',
      data: t.schemes.mkb
    },
    {
      id: 'kanya',
      state: 'br',
      icon: <AwardBadge className="w-8 h-8 text-rose-600" />,
      color: 'bg-rose-50 border-rose-200',
      titleColor: 'text-rose-800',
      data: t.schemes.kanya
    }
  ];

  const statusSteps = [
    { key: 'applied', label: t.schemes.tracker.steps.applied },
    { key: 'verified', label: t.schemes.tracker.steps.verified },
    { key: 'approved', label: t.schemes.tracker.steps.approved },
    { key: 'received', label: t.schemes.tracker.steps.received },
  ];

  // Filter schemes based on state
  const filteredSchemes = schemes.filter(s => selectedState === 'all' ? true : (s.state === 'all' || s.state === selectedState));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 p-2 rounded-lg">
              <Landmark className="w-6 h-6" />
            </span>
            {t.schemes.pageTitle}
          </h2>
          <p className="text-slate-500">{t.schemes.subtitle}</p>
        </div>
        
        <div className="bg-slate-100 p-1 rounded-lg inline-flex self-start border border-slate-200">
           <button
             onClick={() => setActiveTab('all')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'all' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <LayoutList className="w-4 h-4" /> {t.schemes.tabs.all}
           </button>
           <button
             onClick={() => setActiveTab('track')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'track' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <History className="w-4 h-4" /> {t.schemes.tabs.track}
             {trackedApps.length > 0 && (
               <span className="bg-indigo-600 text-white text-[10px] px-1.5 rounded-full">{trackedApps.length}</span>
             )}
           </button>
        </div>
      </div>

      {activeTab === 'all' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
          
          {/* State Filter Bar */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 text-slate-700 font-bold min-w-fit">
                <Map className="w-5 h-5 text-indigo-600" />
                {t.schemes.stateLabel}:
             </div>
             <select 
               value={selectedState}
               onChange={(e) => setSelectedState(e.target.value)}
               className="w-full md:w-64 p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
             >
                <option value="all">{t.schemes.centralLabel}</option>
                <option value="mh">Maharashtra</option>
                <option value="br">Bihar</option>
                <option value="up">Uttar Pradesh</option>
                <option value="rj">Rajasthan</option>
                <option value="mp">Madhya Pradesh</option>
             </select>
          </div>

          {/* Smart Recommender Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                {t.schemes.recommender.title}
            </h2>
            <p className="text-sm text-indigo-700 mb-4">{t.schemes.recommender.desc}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-semibold text-indigo-600 uppercase mb-1">{t.schemes.recommender.children}</label>
                  <input 
                    type="number" 
                    min="0"
                    value={formData.children}
                    onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
                    className="w-full p-2 rounded-lg border border-black bg-white text-black text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-600 uppercase mb-1">{t.schemes.recommender.category}</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 rounded-lg border border-black bg-white text-black text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                  >
                      <option value="gen">{t.schemes.recommender.options.gen}</option>
                      <option value="sc">{t.schemes.recommender.options.sc}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-600 uppercase mb-1">{t.schemes.recommender.card}</label>
                  <select 
                    value={formData.card}
                    onChange={(e) => setFormData({...formData, card: e.target.value})}
                    className="w-full p-2 rounded-lg border border-black bg-white text-black text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
                  >
                      <option value="apl">{t.schemes.recommender.options.apl}</option>
                      <option value="bpl">{t.schemes.recommender.options.bpl}</option>
                  </select>
                </div>
                <button 
                  onClick={() => setShowRecs(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 h-[38px]"
                >
                  {t.schemes.recommender.check} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {filteredSchemes.map((scheme) => {
              const isRecommended = showRecs && recommendedIds.includes(scheme.id);
              const isTracked = trackedApps.some(app => app.schemeId === scheme.id);
              
              if (!scheme.data) return null; // Safety check

              return (
                <div key={scheme.id} className={`rounded-xl border-2 p-6 transition-all duration-300 ${
                    isRecommended 
                      ? 'border-indigo-500 bg-indigo-50/30 shadow-md scale-[1.01]' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl shrink-0 ${scheme.color}`}>
                        {scheme.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h3 className={`text-xl font-bold ${scheme.titleColor}`}>
                              {scheme.data.name}
                          </h3>
                          <div className="flex gap-2">
                             {scheme.state !== 'all' && (
                                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-300">
                                   State Scheme
                                </span>
                             )}
                             {isRecommended && (
                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-indigo-200">
                                  <Sparkles className="w-3 h-3" /> {t.schemes.recommender.recommended}
                                </span>
                             )}
                             {!isTracked && (
                                <button 
                                  onClick={() => addToTracker(scheme.id)}
                                  className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-black transition-colors"
                                >
                                   <PlusCircle className="w-3 h-3" /> {t.schemes.tracker.add}
                                </button>
                             )}
                             {isTracked && (
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-green-200">
                                   <CheckCircle className="w-3 h-3" /> Tracking
                                </span>
                             )}
                          </div>
                        </div>
                        
                        <p className="text-slate-600 mt-2 font-medium">{scheme.data.desc}</p>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mb-3">
                                <CheckCircle className="w-4 h-4 text-green-600" /> {t.schemes.benefitsLabel}
                              </h4>
                              <ul className="space-y-2">
                                {scheme.data.benefits.map((benefit: string, i: number) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0"></span>
                                      <span>{benefit}</span>
                                    </li>
                                ))}
                              </ul>
                          </div>
                          
                          <div>
                              <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mb-3">
                                <ClipboardList className="w-4 h-4 text-blue-600" /> {t.schemes.eligibilityLabel}
                              </h4>
                              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                                {scheme.data.eligibility}
                              </p>
                          </div>
                        </div>

                        {/* Application Process Section */}
                        <div className="mt-6 pt-6 border-t border-slate-200/60">
                          <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mb-3">
                              <FileText className="w-4 h-4 text-purple-600" /> {t.schemes.processLabel}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {scheme.data.process.map((step: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 p-3 rounded-lg">
                                    <span className="bg-slate-100 text-slate-600 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">
                                      {i+1}
                                    </span>
                                    <span className="text-sm text-slate-700">{step}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-800 font-medium">
                {t.schemes.disclaimer}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'track' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h3 className="font-bold text-xl text-slate-700 mb-4">{t.schemes.tracker.title}</h3>
          
          {trackedApps.length === 0 ? (
            <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-xl">
               <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
               <p className="text-slate-500">{t.schemes.tracker.empty}</p>
               <button onClick={() => setActiveTab('all')} className="mt-4 text-indigo-600 hover:underline font-medium">
                  {t.schemes.recommender.check}
               </button>
            </div>
          ) : (
             trackedApps.map((app) => {
               const schemeData = schemes.find(s => s.id === app.schemeId);
               if (!schemeData || !schemeData.data) return null;

               const currentStepIndex = statusSteps.findIndex(s => s.key === app.status);

               return (
                  <div key={app.schemeId} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                     <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${schemeData.color}`}>
                                {schemeData.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-800">{schemeData.data.name}</h4>
                                <p className="text-xs text-slate-500">Added on: {new Date(app.dateAdded).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button 
                           onClick={() => removeFromTracker(app.schemeId)}
                           className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                           title={t.schemes.tracker.remove}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                     </div>

                     {/* Stepper */}
                     <div className="relative flex items-center justify-between w-full mb-8">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-0"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 -z-0 transition-all duration-500" style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}></div>

                        {statusSteps.map((step, idx) => {
                           const isCompleted = idx <= currentStepIndex;
                           const isCurrent = idx === currentStepIndex;
                           
                           return (
                              <div key={step.key} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => updateStatus(app.schemeId, step.key as any)}>
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted 
                                       ? 'bg-green-500 border-green-500 text-white' 
                                       : 'bg-white border-slate-300 text-slate-300'
                                 }`}>
                                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-slate-300"></div>}
                                 </div>
                                 <p className={`absolute top-10 text-[10px] md:text-xs font-medium w-24 text-center transition-colors ${
                                    isCurrent ? 'text-green-700 font-bold' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                                 }`}>
                                    {step.label}
                                 </p>
                              </div>
                           )
                        })}
                     </div>

                     <div className="flex justify-end pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold uppercase text-slate-500">{t.schemes.tracker.update}:</span>
                           <select 
                             value={app.status}
                             onChange={(e) => updateStatus(app.schemeId, e.target.value as any)}
                             className="p-2 border border-slate-300 rounded-md text-sm bg-white text-slate-800 focus:ring-indigo-500 focus:border-indigo-500"
                           >
                              {statusSteps.map(step => (
                                 <option key={step.key} value={step.key}>{step.label}</option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>
               );
             })
          )}
        </div>
      )}
    </div>
  );
};

// Helper Icon for badges
const AwardBadge = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);