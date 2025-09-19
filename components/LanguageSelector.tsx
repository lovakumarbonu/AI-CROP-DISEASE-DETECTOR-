import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../translations';
import { GlobeIcon, SearchIcon } from './Icons';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, translations, currentLanguageDetails } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  useEffect(() => {
    if (isOpen) {
        // Focus the input when the dropdown is opened
        inputRef.current?.focus();
    }
  }, [isOpen]);

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-48" ref={wrapperRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full bg-slate-800/80 border border-slate-700 text-slate-300 py-2 pl-3 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-slate-400" />
            <span className="truncate">{currentLanguageDetails.nativeName}</span>
        </span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 bottom-full mb-2 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg animate-fade-in" style={{animationDuration: '150ms'}}>
          <div className="p-2">
            <div className="relative">
              <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                placeholder={translations.searchLanguagePlaceholder}
                className="w-full bg-slate-900/80 border border-slate-600 rounded-md py-1.5 pl-9 pr-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                  language === lang.code
                    ? 'bg-green-500/20 text-green-300'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lang.nativeName} <span className="text-slate-400 text-xs">({lang.name})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;