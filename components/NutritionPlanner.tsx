
import React, { useState } from 'react';
import { generateDietPlan } from '../services/geminiService';
import { DietPlan } from '../types';
import { Utensils, Coffee, Sun, Moon, Droplet, AlertOctagon, Loader2, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const NutritionPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<DietPlan | null>(null);
  const { t, language } = useLanguage();
  
  const [preferences, setPreferences] = useState({
    type: 'Vegetarian',
    trimester: '2nd Trimester',
    conditions: {
      anemia: true,
      diabetes: false,
      hypertension: false
    }
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const activeConditions = Object.entries(preferences.conditions)
        .filter(([_, active]) => active)
        .map(([name]) => name);
        
      const result = await generateDietPlan(preferences.type, preferences.trimester, activeConditions, language);
      setPlan(result);
    } catch (error) {
      console.error(error);
      alert("Could not generate diet plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (time: string) => {
    const t = time.toLowerCase();
    if (t.includes('morning')) return <Coffee className="w-5 h-5 text-orange-500" />;
    if (t.includes('lunch')) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (t.includes('dinner')) return <Moon className="w-5 h-5 text-indigo-500" />;
    return <Utensils className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-green-100 text-green-700 p-2 rounded-lg"><Utensils className="w-5 h-5" /></span>
          {t.nutrition.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{t.nutrition.dietType}</label>
              <div className="flex gap-2">
                 {[
                   {val: 'Vegetarian', label: t.nutrition.types.veg}, 
                   {val: 'Non-Veg', label: t.nutrition.types.nonveg}, 
                   {val: 'Eggetarian', label: t.nutrition.types.egg}
                 ].map(type => (
                    <button 
                      key={type.val}
                      onClick={() => setPreferences({...preferences, type: type.val})}
                      className={`flex-1 py-2 px-1 rounded-lg text-sm font-medium border ${
                        preferences.type === type.val 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {type.label}
                    </button>
                 ))}
              </div>
           </div>
           
           <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{t.nutrition.trimester}</label>
              <select 
                value={preferences.trimester}
                onChange={(e) => setPreferences({...preferences, trimester: e.target.value})}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-green-500 focus:border-green-500"
              >
                <option value="1st Trimester">{t.nutrition.trimesters.first}</option>
                <option value="2nd Trimester">{t.nutrition.trimesters.second}</option>
                <option value="3rd Trimester">{t.nutrition.trimesters.third}</option>
              </select>
           </div>

           <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{t.nutrition.conditions}</label>
              <div className="space-y-2">
                 {Object.entries(preferences.conditions).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="checkbox" 
                         checked={value}
                         onChange={(e) => setPreferences({
                           ...preferences, 
                           conditions: {...preferences.conditions, [key]: e.target.checked}
                         })}
                         className="w-4 h-4 text-green-600 rounded focus:ring-green-500" 
                       />
                       <span className="text-sm capitalize">{key}</span>
                    </label>
                 ))}
              </div>
           </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Leaf className="w-5 h-5" />}
          {t.nutrition.generate}
        </button>
      </div>

      {plan && (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <h3 className="text-lg font-bold text-slate-800 mb-4">{t.nutrition.planTitle}</h3>
             <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {plan.meals.map((meal, idx) => (
                   <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                         {getIcon(meal.time)}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-700">{meal.time}</span>
                         </div>
                         <h4 className="text-green-700 font-semibold text-lg mb-1">{meal.name}</h4>
                         <p className="text-slate-600 text-sm mb-2">{meal.description}</p>
                         <div className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-medium">
                            {t.nutrition.richIn}: {meal.nutrients}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Hydration */}
             <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
                   <Droplet className="w-5 h-5" /> {t.nutrition.hydration}
                </h4>
                <p className="text-blue-700 text-sm italic">"{plan.hydrationTip}"</p>
             </div>

             {/* Avoid List */}
             <div className="bg-red-50 border border-red-100 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-red-800 flex items-center gap-2 mb-3">
                   <AlertOctagon className="w-5 h-5" /> {t.nutrition.avoid}
                </h4>
                <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                   {plan.avoidList.map((item, i) => (
                      <li key={i}>{item}</li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
