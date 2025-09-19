import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon, ExclamationTriangleIcon, TrashIcon, ButtonSpinner } from './Icons';
import { diseaseTranslations } from '../translations';

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onDelete, onClearAll }) => {
  const { translations, language } = useLanguage();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const handleClearAllClick = () => {
    setIsConfirmingClear(true);
  };

  const handleConfirmClear = () => {
    setIsModalLoading(true);
    setTimeout(() => {
        onClearAll();
        setIsModalLoading(false);
        setIsConfirmingClear(false);
    }, 1200); // Simulate network request
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      setIsModalLoading(true);
      setTimeout(() => {
          onDelete(deletingId);
          setIsModalLoading(false);
          setDeletingId(null);
      }, 1200); // Simulate network request
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 animate-fade-in">
        <p className="text-xl">{translations.noHistory}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleClearAllClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 rounded-lg hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          aria-label={translations.clearHistory}
        >
          <TrashIcon className="w-4 h-4" />
          <span>{translations.clearHistory}</span>
        </button>
      </div>
      <div className="space-y-4">
        {history.map((item) => {
          const { results } = item;
          const diseases = results.filter(r => !r.is_healthy);
          const allHealthy = diseases.length === 0 && results.length > 0;
          const diseaseDict = diseaseTranslations[language] || diseaseTranslations.en;

          let summaryText = '';
          let summaryIcon: React.ReactNode = null;
          let summaryColorClass = '';

          if (diseases.length > 0) {
            const firstDiseaseKey = diseases[0].disease_key?.toUpperCase() || 'UNKNOWN';
            summaryText = diseaseDict[firstDiseaseKey] || diseases[0].disease_name;
            
            if (diseases.length > 1) {
              summaryText += ` & ${diseases.length - 1} ${translations.historyMoreIssues}`;
            }
            summaryIcon = <ExclamationTriangleIcon className="w-5 h-5" />;
            summaryColorClass = 'text-amber-400';
          } else if (allHealthy) {
            if (results.length > 1) {
              summaryText = translations.historyAllHealthy;
            } else {
              const healthyKey = results[0]?.disease_key?.toUpperCase();
              summaryText = (healthyKey && diseaseDict[healthyKey]) 
                  ? diseaseDict[healthyKey] 
                  : translations.historyHealthy;
            }
            summaryIcon = <CheckCircleIcon className="w-5 h-5" />;
            summaryColorClass = 'text-green-400';
          }

          return (
            <div 
              key={item.id} 
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4 transform transition-all duration-300 ease-in-out hover:bg-slate-800 hover:border-green-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10"
            >
              <img 
                  src={item.imagePreviewUrl} 
                  alt="Analysis thumbnail" 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md cursor-pointer"
                  onClick={() => onSelect(item)}
              />
              <div className="flex-grow cursor-pointer min-w-0" onClick={() => onSelect(item)}>
                <p className="font-bold text-slate-200">{translations.historyCardTitle} {new Date(item.id).toLocaleDateString()}</p>
                <p className="text-sm text-slate-400">{new Date(item.id).toLocaleTimeString()}</p>
                {summaryText && (
                    <div className={`flex items-center gap-2 mt-2 ${summaryColorClass}`}>
                        {summaryIcon}
                        <span className="font-semibold text-sm truncate" title={summaryText}>{summaryText}</span>
                    </div>
                )}
              </div>
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    setDeletingId(item.id);
                }}
                aria-label={translations.deleteEntry}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-colors"
              >
                <TrashIcon />
              </button>
            </div>
          );
        })}
      </div>

      {isConfirmingClear && (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-clear-title"
            onClick={() => !isModalLoading && setIsConfirmingClear(false)}
        >
            <div 
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md text-center transform transition-all animate-bounce-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center mb-4">
                    <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
                </div>
                <h2 id="confirm-clear-title" className="text-2xl font-bold text-slate-100 mb-2">{translations.confirmClearTitle}</h2>
                <p className="text-slate-300 mb-6">{translations.confirmClearHistory}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setIsConfirmingClear(false)}
                        disabled={isModalLoading}
                        className="flex-1 px-6 py-2 font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors disabled:bg-slate-800 disabled:cursor-not-allowed"
                    >
                        {translations.cancelButton}
                    </button>
                    <button
                        onClick={handleConfirmClear}
                        disabled={isModalLoading}
                        className="flex-1 px-6 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors disabled:bg-red-800 disabled:cursor-wait flex justify-center items-center"
                    >
                        {isModalLoading ? <ButtonSpinner /> : translations.confirmButton}
                    </button>
                </div>
            </div>
        </div>
      )}

      {deletingId && (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            onClick={() => !isModalLoading && setDeletingId(null)}
        >
            <div 
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md text-center transform transition-all animate-bounce-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center mb-4">
                    <ExclamationTriangleIcon className="w-12 h-12 text-amber-500" />
                </div>
                <h2 id="confirm-delete-title" className="text-2xl font-bold text-slate-100 mb-2">{translations.confirmDeleteEntryTitle}</h2>
                <p className="text-slate-300 mb-6">{translations.confirmDeleteEntryText}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setDeletingId(null)}
                        disabled={isModalLoading}
                        className="flex-1 px-6 py-2 font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors disabled:bg-slate-800 disabled:cursor-not-allowed"
                    >
                        {translations.cancelButton}
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        disabled={isModalLoading}
                        className="flex-1 px-6 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors disabled:bg-red-800 disabled:cursor-wait flex justify-center items-center"
                    >
                        {isModalLoading ? <ButtonSpinner /> : translations.confirmDeleteEntryButton}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default History;