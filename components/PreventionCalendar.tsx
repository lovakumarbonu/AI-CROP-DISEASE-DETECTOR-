import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { PreventionTask } from '../types';
import { LeafIcon, PillIcon, OrganicIcon } from './Icons';

interface PreventionCalendarProps {
    onGenerate: (inputs: { crop: string; season: string; soil: string; region: string; }) => void;
    calendarData: PreventionTask[] | null;
}

const PreventionCalendar: React.FC<PreventionCalendarProps> = ({ onGenerate, calendarData }) => {
    const { translations } = useLanguage();
    const [inputs, setInputs] = useState({
        crop: '',
        season: 'Spring',
        soil: 'Loamy',
        region: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (inputs.crop && inputs.region) {
            onGenerate(inputs);
        }
    };
    
    const getTaskIcon = (type: PreventionTask['task_type']) => {
        switch (type) {
            case 'Organic':
                return <OrganicIcon className="w-6 h-6 text-green-400" />;
            case 'Chemical':
                return <PillIcon className="w-6 h-6 text-amber-400" />;
            case 'Cultural Practice':
                return <LeafIcon className="w-6 h-6 text-blue-400" />;
            default:
                return <LeafIcon className="w-6 h-6 text-slate-400" />;
        }
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-6 w-full animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">{translations.preventionIntro}</h2>
                <p className="text-slate-400">{translations.preventionDescription}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="crop" className="block text-sm font-medium text-slate-300 mb-1">{translations.cropTypeLabel}</label>
                        <input
                            type="text"
                            id="crop"
                            name="crop"
                            value={inputs.crop}
                            onChange={handleInputChange}
                            placeholder={translations.cropTypePlaceholder}
                            className={`w-full bg-slate-900/50 border rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${formSubmitted && !inputs.crop ? 'border-red-500' : 'border-slate-600'}`}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="season" className="block text-sm font-medium text-slate-300 mb-1">{translations.seasonLabel}</label>
                        <select
                            id="season"
                            name="season"
                            value={inputs.season}
                            onChange={handleInputChange}
                            className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        >
                            <option>Spring</option>
                            <option>Summer</option>
                            <option>Autumn</option>
                            <option>Winter</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="soil" className="block text-sm font-medium text-slate-300 mb-1">{translations.soilLabel}</label>
                        <select
                            id="soil"
                            name="soil"
                            value={inputs.soil}
                            onChange={handleInputChange}
                             className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        >
                            <option>Loamy</option>
                            <option>Sandy</option>
                            <option>Clay</option>
                            <option>Silty</option>
                            <option>Peaty</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="region" className="block text-sm font-medium text-slate-300 mb-1">{translations.regionLabel}</label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            value={inputs.region}
                            onChange={handleInputChange}
                            placeholder={translations.regionPlaceholder}
                            className={`w-full bg-slate-900/50 border rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${formSubmitted && !inputs.region ? 'border-red-500' : 'border-slate-600'}`}
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all transform hover:scale-105"
                >
                    {translations.generateCalendarButton}
                </button>
            </form>
            
            {calendarData && (
                <div className="border-t border-slate-700 pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4">{translations.calendarTitle}</h3>
                    {calendarData.length > 0 ? (
                        <div className="space-y-4">
                            {calendarData.map((task, index) => (
                                <div key={index} className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-green-500 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">{getTaskIcon(task.task_type)}</div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="font-bold text-slate-200">{task.task_title}</h4>
                                                <span className="text-xs font-semibold text-green-300 bg-green-900/50 px-2 py-1 rounded-full">{task.timing}</span>
                                            </div>
                                            <p className="text-sm text-slate-400 mt-1">{task.task_type}</p>
                                            <p className="text-slate-300 mt-2">{task.task_description}</p>
                                            <p className="text-xs text-slate-500 mt-2 italic"><strong>Reason:</strong> {task.reason}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-slate-400 bg-slate-800 p-4 rounded-md">{translations.noCalendarData}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PreventionCalendar;
