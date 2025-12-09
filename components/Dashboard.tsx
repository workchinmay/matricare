
import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Line 
} from "recharts";
import { 
  Activity, AlertTriangle, Users, TrendingUp, Baby, Calendar, Phone, 
  Utensils, MapPin, Heart, Plus, X, Save, Stethoscope
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useClinicalContext } from "../contexts/ClinicalContext";

export const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'patient' | 'center'>('patient');
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
       {/* Header with Toggle */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-bold text-slate-800">
                {viewMode === 'patient' ? `${t.dashboard.greeting}, Lakshmi` : 'PHC Center Overview'}
            </h2>
            <p className="text-slate-500 text-sm">
                {viewMode === 'patient' ? 'ID: 123456789 • Last Checkup: 12 Oct' : 'Primary Health Center, Jalgaon'}
            </p>
         </div>
         
         <div className="bg-slate-100 p-1 rounded-lg inline-flex self-start border border-slate-200">
            <button
                onClick={() => setViewMode('patient')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'patient' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Baby className="w-4 h-4" /> {t.dashboard.patientView}
            </button>
            <button
                onClick={() => setViewMode('center')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'center' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Users className="w-4 h-4" /> {t.dashboard.centerView}
            </button>
         </div>
       </div>

       {viewMode === 'patient' ? <PatientDashboard /> : <CenterDashboard />}
    </div>
  );
};

// --- Patient View Component ---
const PatientDashboard = () => {
  const { t, language } = useLanguage();
  const { vitals, addVitals, currentGestationalWeek } = useClinicalContext();
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
      weight: '',
      hb: '',
      sys: '',
      dia: ''
  });

  const latest = vitals[vitals.length - 1] || { weight: 0, hb: 0, bp: '--/--' };

  // Calculate dynamic stats based on currentGestationalWeek
  const trimester = currentGestationalWeek < 13 ? 1 : currentGestationalWeek < 27 ? 2 : 3;
  const daysPassed = currentGestationalWeek * 7;
  const daysTotal = 40 * 7;
  const daysToGo = Math.max(0, daysTotal - daysPassed);
  const progressPercent = Math.min(100, (daysPassed / daysTotal) * 100);

  const getOrdinal = (n: number) => {
    if (language !== 'en') return ''; // Simplified for Hindi/Marathi
    return n === 1 ? 'st' : n === 2 ? 'nd' : 'rd';
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveDetails = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newWeight = formData.weight ? parseFloat(formData.weight) : latest.weight;
      const newHb = formData.hb ? parseFloat(formData.hb) : latest.hb;
      const newBp = (formData.sys && formData.dia) ? `${formData.sys}/${formData.dia}` : latest.bp;

      addVitals({
         weight: newWeight,
         hb: newHb,
         bp: newBp
      });

      // Close and Reset
      setShowModal(false);
      setFormData({ weight: '', hb: '', sys: '', dia: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 relative">
        
        {/* Action Bar */}
        <div className="flex justify-end">
            <button 
                onClick={() => setShowModal(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 flex items-center gap-2 text-sm font-medium transition-colors"
            >
                <Plus className="w-4 h-4" /> {t.dashboard.logVitals}
            </button>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* Weeks Card */}
             <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-pink-100">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.progress}</span>
                    </div>
                    <h3 className="text-4xl font-bold mt-1">{t.dashboard.week} {currentGestationalWeek}</h3>
                    <p className="text-sm mt-2 opacity-90">{trimester}{getOrdinal(trimester)} {t.dashboard.trimester} • {daysToGo} {t.dashboard.daysToGo}</p>
                    <div className="mt-4 w-full bg-black/20 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>
                <Baby className="absolute -bottom-6 -right-6 w-40 h-40 text-white opacity-20 rotate-12" />
             </div>

             {/* Next Appointment */}
             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <MapPin className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.nextCheckup}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">9th November</h3>
                    <p className="text-teal-700 font-medium text-sm mt-1">PMSMA Camp</p>
                    <p className="text-slate-500 text-xs mt-1">PHC Jalgaon (2.5 km)</p>
                </div>
                <button className="mt-4 w-full py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                    {t.dashboard.getDirections}
                </button>
             </div>

             {/* Risk Status */}
             <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                 <div>
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.healthStatus}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                        Low Risk <Heart className="w-5 h-5 fill-green-600 text-green-600" />
                    </h3>
                    <p className="text-green-700 text-xs mt-1">{t.dashboard.stable}</p>
                 </div>
                 <div className="mt-4 flex gap-2">
                     <div className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-green-700 border border-green-100 shadow-sm flex-1 text-center">
                        BP: {latest.bp}
                     </div>
                     <div className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-green-700 border border-green-100 shadow-sm flex-1 text-center">
                        Hb: {latest.hb}
                     </div>
                 </div>
             </div>
        </div>

        {/* Middle Section: Timeline & Daily Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-indigo-500" /> Weight & Hb Tracker
                </h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={vitals}>
                             <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                            <YAxis yAxisId="right" orientation="right" stroke="#ef4444" fontSize={12} tickLine={false} axisLine={false} domain={[5, 16]} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <Area yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" fillOpacity={1} fill="url(#colorWeight)" name="Weight (kg)" strokeWidth={3} />
                            <Line yAxisId="right" type="monotone" dataKey="hb" stroke="#ef4444" strokeWidth={2} dot={{r: 4, fill: '#ef4444'}} name="Hemoglobin (g/dL)" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-4">
                {/* Emergency Card */}
                 <div className="bg-red-50 border border-red-100 rounded-xl p-5 shadow-sm">
                    <h4 className="font-bold text-red-800 flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4" /> {t.dashboard.emergency}
                    </h4>
                    <p className="text-xs text-red-600 mb-3 leading-relaxed">
                        {t.dashboard.emergencyDesc}
                    </p>
                    <button className="w-full py-2.5 bg-red-600 text-white rounded-lg font-bold shadow hover:bg-red-700 flex items-center justify-center gap-2 transition-colors">
                        <Phone className="w-4 h-4" /> {t.dashboard.callAmbulance}
                    </button>
                    <button className="w-full mt-2 py-2.5 bg-white text-red-600 border border-red-200 rounded-lg font-bold hover:bg-red-50 text-sm transition-colors">
                        {t.dashboard.callAsha}
                    </button>
                 </div>

                 {/* Nutrition Tip */}
                 <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 shadow-sm">
                    <h4 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                        <Utensils className="w-4 h-4" /> {t.dashboard.nutritionTip}
                    </h4>
                    <p className="text-sm text-orange-700 italic">
                        "Include one bowl of lentils (Dal) and green leafy vegetables (Palak/Methi) in your lunch today for Iron."
                    </p>
                    <div className="mt-3 flex gap-2">
                        <span className="px-2 py-1 bg-white/60 rounded text-[10px] text-orange-800 font-medium">#IronRich</span>
                        <span className="px-2 py-1 bg-white/60 rounded text-[10px] text-orange-800 font-medium">#HealthyMom</span>
                    </div>
                 </div>
            </div>
        </div>

        {/* Add Details Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-teal-700 p-4 flex justify-between items-center text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5" /> {t.dashboard.logVitals}
                        </h3>
                        <button onClick={() => setShowModal(false)} className="hover:bg-teal-600 p-1 rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handleSaveDetails} className="p-6 space-y-4">
                       <div>
                           <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t.dashboard.weight}</label>
                           <input 
                                type="number" step="0.1" name="weight" 
                                value={formData.weight} onChange={handleInputChange}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" 
                                placeholder="e.g. 66.5"
                           />
                       </div>
                       <div>
                           <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t.dashboard.bp}</label>
                           <div className="flex gap-2">
                               <input 
                                    type="number" name="sys" placeholder="Sys"
                                    value={formData.sys} onChange={handleInputChange}
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" 
                               />
                               <span className="self-center text-slate-400">/</span>
                               <input 
                                    type="number" name="dia" placeholder="Dia"
                                    value={formData.dia} onChange={handleInputChange}
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" 
                               />
                           </div>
                       </div>
                       <div>
                           <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t.dashboard.hb}</label>
                           <input 
                                type="number" step="0.1" name="hb"
                                value={formData.hb} onChange={handleInputChange}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900" 
                                placeholder="e.g. 11.2"
                           />
                       </div>

                       <div className="pt-2">
                           <button 
                                type="submit" 
                                className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold shadow hover:bg-teal-700 flex justify-center items-center gap-2"
                           >
                               <Save className="w-4 h-4" /> {t.dashboard.save}
                           </button>
                       </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

// --- Center View Component ---
const CenterDashboard = () => {
    // Mock Data
    const riskStats = [
        { name: "Low Risk", value: 120, color: "#22c55e" },
        { name: "Moderate Risk", value: 45, color: "#f97316" },
        { name: "High Risk", value: 15, color: "#ef4444" },
    ];

    const iugrStats = [
        { name: "Normal", count: 85 },
        { name: "Suspected FGR", count: 10 },
        { name: "Confirmed FGR", count: 5 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-slate-500">Total Screenings</p>
                        <p className="text-2xl font-bold text-slate-800">180</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600"><AlertTriangle className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-slate-500">High Risk Alerts</p>
                        <p className="text-2xl font-bold text-slate-800">15</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600"><TrendingUp className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-slate-500">Referrals Sent</p>
                        <p className="text-2xl font-bold text-slate-800">22</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="bg-teal-100 p-3 rounded-full text-teal-600"><Activity className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm text-slate-500">Active Camps</p>
                        <p className="text-2xl font-bold text-slate-800">5</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-700 mb-4">Pregnancy Risk Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={riskStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {riskStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {riskStats.map((stat) => (
                            <div key={stat.name} className="flex items-center gap-1 text-xs">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                                <span>{stat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-700 mb-4">Growth Scans (IUGR Stats)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={iugrStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: '#f1f5f9'}} />
                                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
