
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface VitalRecord {
  date: string;
  week: string;
  weight: number;
  hb: number;
  bp: string;
}

interface ClinicalContextType {
  vitals: VitalRecord[];
  bmi: number;
  lmp: string | null;
  currentGestationalWeek: number;
  setBmi: (height: number, weight: number) => void;
  setLmp: (date: string) => void;
  addVitals: (record: { weight: number; hb: number; bp: string }) => void;
}

const ClinicalContext = createContext<ClinicalContextType | undefined>(undefined);

export const ClinicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bmi, setBmiState] = useState<number>(22.9);
  const [lmp, setLmpState] = useState<string | null>(null);
  const [currentGestationalWeek, setCurrentGestationalWeek] = useState<number>(12); // Default fallback
  const [vitals, setVitals] = useState<VitalRecord[]>([]);

  // Load LMP from local storage on mount
  useEffect(() => {
    const savedLmp = localStorage.getItem('patient_lmp');
    if (savedLmp) {
      setLmpState(savedLmp);
      calculateWeek(savedLmp);
      generateHistory(savedLmp);
    } else {
      // Fallback if no LMP: generate generic recent history
      generateHistory(new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]);
    }
  }, []);

  const calculateWeek = (lmpDate: string) => {
    const start = new Date(lmpDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    setCurrentGestationalWeek(weeks > 42 ? 40 : weeks);
  };

  const generateHistory = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();
    const mockData: VitalRecord[] = [];
    const baseWeight = 52; // Starting weight kg
    const baseHb = 12.5;   // Starting Hb

    // Generate data points for weeks 8, 12, 16, 20, 24, 28, 32, 36... up to today
    // We iterate by weeks
    for (let w = 8; w <= 40; w += 4) {
      const d = new Date(start);
      d.setDate(d.getDate() + (w * 7));
      
      // Don't generate future data beyond 2 weeks from now
      if (d.getTime() > today.getTime() + (14 * 24 * 60 * 60 * 1000)) break;

      const dateStr = d.toISOString().split('T')[0];
      
      // Simulate weight gain curve (approx 0.3-0.5kg/week in 2nd/3rd trimester)
      let weightGain = 0;
      if (w > 12) {
         weightGain = (w - 12) * 0.45; 
      }
      
      // Simulate Physiological Anemia of pregnancy (Hb drops slightly in 2nd trimester)
      let hbDrop = 0;
      if (w > 12 && w < 28) hbDrop = 1.2; 
      else if (w >= 28) hbDrop = 0.8;

      mockData.push({
        date: dateStr,
        week: `W${w}`,
        weight: parseFloat((baseWeight + weightGain).toFixed(1)),
        hb: parseFloat((baseHb - hbDrop).toFixed(1)),
        bp: '110/70'
      });
    }

    // If pregnancy is very early (<8 weeks), just add baseline
    if (mockData.length === 0) {
       mockData.push({
          date: startDate,
          week: 'W0',
          weight: baseWeight,
          hb: baseHb,
          bp: '110/70'
       });
    }

    setVitals(mockData);
  };

  const setLmp = (date: string) => {
    setLmpState(date);
    localStorage.setItem('patient_lmp', date);
    calculateWeek(date);
    generateHistory(date);
  };
  
  const setBmi = (heightCm: number, weightKg: number) => {
    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const calculatedBMI = weightKg / (heightM * heightM);
      setBmiState(parseFloat(calculatedBMI.toFixed(1)));
    }
  };

  const addVitals = (record: { weight: number; hb: number; bp: string }) => {
    const newRecord: VitalRecord = {
      date: new Date().toISOString().split('T')[0],
      week: `W${currentGestationalWeek}`, 
      weight: record.weight,
      hb: record.hb,
      bp: record.bp
    };
    setVitals(prev => {
        // Remove if entry exists for this week to avoid duplicates in chart
        const filtered = prev.filter(p => p.week !== newRecord.week);
        return [...filtered, newRecord].sort((a,b) => a.week.localeCompare(b.week, undefined, { numeric: true }));
    });
  };

  const value = {
    vitals,
    bmi,
    lmp,
    currentGestationalWeek,
    setBmi,
    setLmp,
    addVitals
  };

  return (
    <ClinicalContext.Provider value={value}>
      {children}
    </ClinicalContext.Provider>
  );
};

export const useClinicalContext = () => {
  const context = useContext(ClinicalContext);
  if (context === undefined) {
    throw new Error('useClinicalContext must be used within a ClinicalProvider');
  }
  return context;
};
