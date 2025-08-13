'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Volume2, Sparkles } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { TranslationBoxProps } from '@/types';

const TranslationBox: React.FC<TranslationBoxProps> = ({ value, isTranslating, error, targetLanguage, onLanguageChange, languages }) => {
	const [showToast, setShowToast] = useState(false);

	// Handle copy with toast notification
	const handleCopyClick = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setShowToast(true);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};

	// Auto-hide toast after 2 seconds
	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [showToast]);

	// Handle speech with proper language mapping
	const handleSpeakClick = () => {
		if ('speechSynthesis' in window && value) {
			// Stop any current speech
			speechSynthesis.cancel();

			const utterance = new SpeechSynthesisUtterance(value);

			// Language mapping for speech synthesis
			const languageMap: { [key: string]: string; } = {
				spanish: 'es-ES',
				french: 'fr-FR',
				german: 'de-DE',
				italian: 'it-IT',
				portuguese: 'pt-PT',
				russian: 'ru-RU',
				japanese: 'ja-JP',
				korean: 'ko-KR',
				chinese: 'zh-CN',
				arabic: 'ar-SA',
				hindi: 'hi-IN',
				dutch: 'nl-NL',
				english: 'en-US'
			};

			utterance.lang = languageMap[targetLanguage] || 'en-US';
			utterance.rate = 0.8; // Slightly slower for clarity
			speechSynthesis.speak(utterance);
		}
	};

	return (
		<div className="relative">
			{/* Toast Notification */}
			{showToast && (
				<div className="absolute w-52 bottom-0 left-1/2 transform -translate-x-15 -translate-y-10 z-50">
					<div className="bg-green-500/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-green-500/30 animate-in fade-in slide-in-from-top-2 duration-300">
						<div className="flex items-center space-x-2">
							<Copy className="w-4 h-4" />
							<span className="text-sm font-medium">Copied to clipboard!</span>
						</div>
					</div>
				</div>
			)}

			{/* Translation Output with integrated dropdown */}
			<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
				{/* Language Selector Header */}
				<div className="mb-4">
					<LanguageSelector value={targetLanguage} onChange={onLanguageChange} languages={languages.filter(lang => lang.code !== 'auto')} label="To" />
				</div>

				<div className="relative h-40">
					<div className="absolute top-4 left-4 text-gray-400 z-10">
						<Sparkles className="w-5 h-5" />
					</div>

					<textarea value={value} readOnly placeholder="Translation will appear here..." className="w-full h-full bg-gray-900/70 border border-gray-600/50 rounded-xl p-4 pl-12 text-gray-200 placeholder-gray-500 resize-none" />

					{/* Loading gif */}
					{isTranslating && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 rounded-xl">
							<div className="flex flex-col items-center space-y-2">
								<img src="/Loading.gif" alt="Loading..." className="w-28 h-28" />
							</div>
						</div>
					)}
				</div>

				{/* Action buttons - container always present for consistent height, buttons invisible when no content */}
				<div className="flex justify-end mt-3 h-8">
					<div className={`flex space-x-2 ${value && !isTranslating ? 'visible' : 'invisible'}`}>
						<button onClick={handleCopyClick} className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-100 text-gray-300 hover:text-white hover:scale-105 active:scale-95" title="Copy to clipboard" disabled={!value || isTranslating}>
							<Copy className="w-4 h-4" />
						</button>
						<button onClick={handleSpeakClick} className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-100 text-gray-300 hover:text-white hover:scale-105 active:scale-95" title="Read aloud" disabled={!value || isTranslating}>
							<Volume2 className="w-4 h-4" />
						</button>
					</div>
				</div>

				{error && (
					<div className="mt-2 text-sm text-red-400">
						{error}
					</div>
				)}
			</div>
		</div>
	);
};

export default TranslationBox;