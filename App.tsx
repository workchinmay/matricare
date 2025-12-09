


import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { RiskAssessment } from "./components/RiskAssessment";
import { USGAnalysis } from "./components/USGAnalysis";
import { CTGAnalysis } from "./components/CTGAnalysis";
import { PMSMALocator } from "./components/PMSMALocator";
import { NutritionPlanner } from "./components/NutritionPlanner";
import { GovernmentSchemes } from "./components/GovernmentSchemes";
import { PregnancyTracker } from "./components/PregnancyTracker";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ClinicalProvider } from "./contexts/ClinicalContext";

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "risk":
        return <RiskAssessment />;
      case "tracker":
        return <PregnancyTracker />;
      case "usg":
        return <USGAnalysis />;
      case "ctg":
        return <CTGAnalysis />;
      case "nutrition":
        return <NutritionPlanner />;
      case "locator":
        return <PMSMALocator />;
      case "schemes":
        return <GovernmentSchemes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ClinicalProvider>
        <AppContent />
      </ClinicalProvider>
    </LanguageProvider>
  );
};

export default App;