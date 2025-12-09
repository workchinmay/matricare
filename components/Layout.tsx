


import React from "react";
import { Activity, Baby, Stethoscope, MapPin, LayoutDashboard, HeartPulse, Utensils, Globe, ScrollText, Footprints } from "lucide-react";
import { ChatBot } from "./ChatBot";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { id: "risk", label: t.nav.riskScore, icon: Activity },
    { id: "tracker", label: t.nav.tracker, icon: Footprints },
    { id: "usg", label: t.nav.usg, icon: Baby },
    { id: "ctg", label: t.nav.ctg, icon: HeartPulse },
    { id: "nutrition", label: t.nav.nutrition, icon: Utensils },
    { id: "schemes", label: t.nav.schemes, icon: ScrollText },
    { id: "locator", label: t.nav.locator, icon: MapPin },
  ];

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row relative">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-teal-800 text-white shadow-xl fixed h-full z-10">
        <div className="p-6 border-b border-teal-700">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
               <Stethoscope className="w-6 h-6 text-teal-800" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
              <p className="text-xs text-teal-200">Safe Motherhood</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 bg-teal-900/50 p-2 rounded-lg">
             <Globe className="w-4 h-4 text-teal-300" />
             <select 
               value={language} 
               onChange={handleLangChange}
               className="bg-transparent text-sm text-white outline-none w-full cursor-pointer"
             >
               <option value="en" className="text-slate-900">English</option>
               <option value="hi" className="text-slate-900">हिंदी (Hindi)</option>
               <option value="mr" className="text-slate-900">मराठी (Marathi)</option>
             </select>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-teal-600 text-white shadow-md font-medium"
                      : "text-teal-100 hover:bg-teal-700 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 bg-teal-900 text-xs text-teal-300 text-center">
          v1.2.0 &copy; 2025 MatriCare
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-teal-800 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-20">
         <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            <span className="font-bold">{t.appTitle}</span>
         </div>
         <select 
            value={language} 
            onChange={handleLangChange}
            className="bg-teal-900 text-xs text-white p-1 rounded border border-teal-600"
         >
            <option value="en">Eng</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
         </select>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        {children}
      </main>
      
      {/* Integrated ChatBot */}
      <ChatBot />

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-20 safe-area-bottom overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${
              activeTab === item.id ? "text-teal-700 bg-teal-50" : "text-gray-400"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] mt-1 truncate max-w-[60px]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};