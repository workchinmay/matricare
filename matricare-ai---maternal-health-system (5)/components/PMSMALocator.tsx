
import React, { useEffect, useState } from "react";
import { findNearbyMedicalCenters } from "../services/geminiService";
import { LocationSearchResult } from "../types";
import { MapPin, Navigation, Loader2, RefreshCw, Search } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export const PMSMALocator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [result, setResult] = useState<LocationSearchResult | null>(null);
  const [manualQuery, setManualQuery] = useState("");
  const { t, language } = useLanguage();

  const fetchNearbyCenters = (location: { lat?: number; lon?: number; query?: string }) => {
    setLoading(true);
    setError(null);
    findNearbyMedicalCenters(location, language)
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch nearby centers. Please try again.");
        setLoading(false);
      });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setManualQuery(""); 
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        fetchNearbyCenters({ lat: latitude, lon: longitude });
      },
      (err) => {
        console.error(err);
        setError("Location permission denied. Please allow location access or enter location manually.");
        setLoading(false);
      }
    );
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;
    setUserLocation(null);
    fetchNearbyCenters({ query: manualQuery });
  };

  useEffect(() => {
    // Re-fetch when language changes if we already have a result or location
    if (result && userLocation) {
        fetchNearbyCenters({ lat: userLocation.lat, lon: userLocation.lon });
    } else if (result && manualQuery) {
        fetchNearbyCenters({ query: manualQuery });
    } else {
        // Initial load
        handleGetLocation();
    }
  }, [language]);

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
       const isListItem = line.trim().startsWith('*') || line.trim().startsWith('-');
       const isNumberedList = /^\d+\./.test(line.trim());
       
       const parts = line.split(/(\*\*.*?\*\*)/g);
       const content = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
             return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
          }
          return <span key={i}>{part}</span>;
       });
  
       return (
          <div key={index} className={`leading-7 ${isListItem ? 'ml-6' : ''} ${isNumberedList ? 'mt-4' : ''}`}>
             {content}
          </div>
       );
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
            <MapPin className="w-5 h-5" />
          </span>
          {t.locator.title}
        </h2>
        {userLocation && (
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Navigation className="w-3 h-3" />
            {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
          </span>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
        {t.locator.info}
      </div>

      {/* Manual Search Bar */}
      <form onSubmit={handleManualSearch} className="flex gap-2">
         <div className="relative flex-1">
            <input 
              type="text" 
              placeholder={t.locator.searchPlaceholder}
              value={manualQuery}
              onChange={(e) => setManualQuery(e.target.value)}
              className="w-full rounded-md border-slate-300 shadow-sm border p-3 pl-10 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
         </div>
         <button 
           type="submit"
           disabled={loading || !manualQuery.trim()}
           className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
         >
           {t.locator.searchButton}
         </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center justify-between">
          <p>{error}</p>
          <button 
            onClick={handleGetLocation}
            className="text-sm bg-white border border-red-200 px-3 py-1 rounded hover:bg-red-50 font-medium whitespace-nowrap ml-2"
          >
            {t.locator.retryGps}
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p>{t.locator.searching}</p>
        </div>
      ) : result ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Main Text Content */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="font-sans text-slate-700 text-sm md:text-base">
               {formatText(result.text)}
            </div>
          </div>

          {/* Source Cards (Google Maps Links) */}
          {result.groundingChunks && result.groundingChunks.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                {t.locator.foundLocations}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {result.groundingChunks.map((chunk, index) => {
                  if (chunk.maps) {
                    return (
                      <a
                        key={index}
                        href={chunk.maps.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all group"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-slate-800 group-hover:text-blue-600 line-clamp-1">
                            {chunk.maps.title}
                          </h4>
                          <Navigation className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{t.locator.viewMap}</p>
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
          
          <div className="flex justify-center">
             <button onClick={handleGetLocation} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <RefreshCw className="w-4 h-4" /> {t.locator.useGps}
             </button>
          </div>
        </div>
      ) : (
         !error && (
            <div className="text-center py-12">
               <button 
                  onClick={handleGetLocation}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
               >
                  <Navigation className="w-5 h-5" />
                  {t.locator.findNearMe}
               </button>
            </div>
         )
      )}
    </div>
  );
};
