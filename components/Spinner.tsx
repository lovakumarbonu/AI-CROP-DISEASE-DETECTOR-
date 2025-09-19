import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SpinnerProps {
    onCancel: () => void;
}

const Spinner: React.FC<SpinnerProps> = ({ onCancel }) => {
  const { translations } = useLanguage();
  
  const messages = [
    translations.spinnerAnalyzing,
    translations.spinnerMessage1,
    translations.spinnerMessage2,
    translations.spinnerMessage3,
  ].filter(Boolean);

  const [currentMessage, setCurrentMessage] = useState(messages[0] || translations.spinnerAnalyzing);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const validMessages = messages.length > 0 ? messages : [translations.spinnerAnalyzing];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % validMessages.length;
      setCurrentMessage(validMessages[index]);
      setKey(prevKey => prevKey + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [messages, translations.spinnerAnalyzing]);


  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col justify-center items-center z-50 animate-fade-in">
        <div className="leaf-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <style>{`
            .leaf-spinner {
                width: 120px;
                height: 120px;
                position: relative;
                transform-style: preserve-3d;
                perspective: 800px;
                animation: rotate-base 12s infinite linear;
            }

            .leaf-spinner div {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 3px solid #4ade80;
                border-radius: 50% 0;
                animation: unfold-leaf 3s ease-in-out infinite alternate;
                box-shadow: 0 0 15px #4ade80, inset 0 0 10px #4ade8066;
            }

            .leaf-spinner div:nth-child(1) { transform: rotateY(0deg) rotateX(60deg); animation-delay: 0s; }
            .leaf-spinner div:nth-child(2) { transform: rotateY(60deg) rotateX(60deg); animation-delay: -0.25s; }
            .leaf-spinner div:nth-child(3) { transform: rotateY(120deg) rotateX(60deg); animation-delay: -0.5s; }
            .leaf-spinner div:nth-child(4) { transform: rotateY(180deg) rotateX(60deg); animation-delay: -0.75s; }
            .leaf-spinner div:nth-child(5) { transform: rotateY(240deg) rotateX(60deg); animation-delay: -1s; }
            .leaf-spinner div:nth-child(6) { transform: rotateY(300deg) rotateX(60deg); animation-delay: -1.25s; }

            @keyframes rotate-base {
                from { transform: rotateY(0deg) rotateX(0deg); }
                to { transform: rotateY(360deg) rotateX(360deg); }
            }
            
            @keyframes unfold-leaf {
                0%, 10% {
                    transform: rotateY(var(--base-y-rot)) rotateX(20deg) scale(0.5);
                    opacity: 0.5;
                }
                90%, 100% {
                    transform: rotateY(var(--base-y-rot)) rotateX(60deg) scale(1);
                    opacity: 1;
                }
            }
            .leaf-spinner div:nth-child(1) { --base-y-rot: 0deg; }
            .leaf-spinner div:nth-child(2) { --base-y-rot: 60deg; }
            .leaf-spinner div:nth-child(3) { --base-y-rot: 120deg; }
            .leaf-spinner div:nth-child(4) { --base-y-rot: 180deg; }
            .leaf-spinner div:nth-child(5) { --base-y-rot: 240deg; }
            .leaf-spinner div:nth-child(6) { --base-y-rot: 300deg; }
        `}</style>
        <p key={key} className="text-green-400 text-lg font-semibold mt-8 text-center px-4 animate-fade-in">{currentMessage}</p>
        <p className="text-slate-400 text-sm mt-1">{translations.spinnerWait}</p>
        <button
            onClick={onCancel}
            className="mt-6 px-6 py-2 font-semibold text-slate-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
        >
            {translations.cancelButton}
        </button>
    </div>
  );
};

export default Spinner;
