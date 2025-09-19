import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UploadIcon, CameraIcon, MicrophoneIcon } from './Icons';

// FIX: Add type definitions for the Web Speech API to resolve TypeScript errors.
// These interfaces are based on the MDN documentation for the Web Speech API.
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: SpeechRecognitionAlternative;
  readonly length: number;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
}
interface SpeechRecognitionResultList {
  readonly [index: number]: SpeechRecognitionResult;
  readonly length: number;
}
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}
interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}


// Extend window type for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onAnalyze: () => void;
  onCancelUpload: () => void;
  imageFile: File | null;
  isDisabled: boolean;
  symptomDescription: string;
  onSymptomChange: (description: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onAnalyze, onCancelUpload, imageFile, isDisabled, symptomDescription, onSymptomChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  
  const { translations, currentLanguageDetails } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Cleanup speech recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraOpen) {
      return;
    }

    let active = true;

    const startCamera = async () => {
      setCameraError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (active) {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (err) {
        console.error("Camera access error:", err);
        if (active) {
          setCameraError(translations.cameraError);
          setIsCameraOpen(false);
        }
      }
    };

    startCamera();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isCameraOpen, translations.cameraError]);


  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            onImageSelect(file);
          }
          setIsCameraOpen(false);
        }, 'image/jpeg');
      } else {
        setIsCameraOpen(false);
      }
    }
  }, [onImageSelect]);

  const handleToggleRecording = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSpeechError(translations.speechRecognitionNotSupported);
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = currentLanguageDetails.code;
        
        recognitionRef.current.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
             if (finalTranscript) {
                onSymptomChange(symptomDescription + (symptomDescription.endsWith(' ') || symptomDescription === '' ? '' : ' ') + finalTranscript.trim() + '. ');
            }
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };
        
        recognitionRef.current.onerror = (event) => {
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                setSpeechError(translations.microphonePermissionDenied);
            } else {
                setSpeechError(`Error: ${event.error}`);
            }
            setIsRecording(false);
        };
    }
    
    recognitionRef.current.start();
    setIsRecording(true);
    setSpeechError(null);
  };

  const imagePreviewUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return null;
  }, [imageFile]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <label
        htmlFor="image-upload"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging ? 'border-green-400 bg-slate-800' : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'}
          ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <UploadIcon />
            <p className="mb-2 text-sm text-slate-400">
              <span className="font-semibold text-green-400">{translations.uploaderClick}</span> {translations.uploaderOr}
            </p>
            <p className="text-xs text-slate-500">{translations.uploaderFileType}</p>
            <p className="text-xs text-slate-500 mt-1">{translations.uploaderMultiCrop}</p>
          </div>
        )}
        <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isDisabled} />
      </label>

      {cameraError && <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg w-full max-w-lg">{cameraError}</div>}
      
      {!imageFile && (
        <div className="w-full max-w-lg flex flex-col items-center gap-4">
            <div className="flex items-center w-full">
                <div className="flex-grow border-t border-slate-600"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-sm">{translations.uploaderOr.toLocaleUpperCase()}</span>
                <div className="flex-grow border-t border-slate-600"></div>
            </div>
            <button
                type="button"
                onClick={() => {
                    setCameraError(null);
                    setIsCameraOpen(true);
                }}
                disabled={isDisabled}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-2 font-semibold text-slate-200 bg-slate-700/50 rounded-lg shadow-md hover:bg-slate-600/50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all transform hover:scale-105"
            >
                <CameraIcon />
                {translations.useCameraButton}
            </button>
        </div>
      )}
      
      {imageFile && (
        <div className="w-full max-w-lg flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-full">
                <label htmlFor="symptoms-input" className="block text-sm font-medium text-slate-300 mb-2">
                    {translations.symptomsInputLabel}
                </label>
                <div className="relative">
                    <textarea
                        id="symptoms-input"
                        rows={3}
                        value={symptomDescription}
                        onChange={(e) => onSymptomChange(e.target.value)}
                        placeholder={translations.symptomsInputPlaceholder}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2 pr-12 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                        disabled={isDisabled}
                    />
                    <button
                        type="button"
                        onClick={handleToggleRecording}
                        disabled={isDisabled}
                        className={`absolute right-2 top-2 p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/50 text-red-200' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                        aria-label={isRecording ? translations.stopRecording : translations.recordSymptoms}
                    >
                        <MicrophoneIcon className="w-5 h-5" />
                        {isRecording && <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>}
                    </button>
                </div>
                {speechError && <p className="text-xs text-red-400 mt-1">{speechError}</p>}
            </div>
        </div>
      )}


      {imageFile && (
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
            onClick={onCancelUpload}
            disabled={isDisabled}
            className="w-full sm:w-auto px-8 py-3 font-semibold text-slate-300 bg-slate-700/50 rounded-lg shadow-md hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
            >
            {translations.removeImageButton}
            </button>
            <button
            onClick={onAnalyze}
            disabled={isDisabled}
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all transform hover:scale-105"
            >
            {translations.analyzeButton}
            </button>
        </div>
      )}

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto max-h-[70vh] max-w-4xl rounded-lg object-contain" aria-label="Live camera feed"></video>
          <canvas ref={canvasRef} className="hidden" aria-hidden="true"></canvas>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleCapture}
              className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all transform hover:scale-105"
            >
              {translations.captureButton}
            </button>
            <button
              onClick={() => setIsCameraOpen(false)}
              className="px-6 py-2 font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
            >
              {translations.cancelButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
