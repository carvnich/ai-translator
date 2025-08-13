"use client";

import React from 'react';
import AnimatedBackground from './ui/AnimatedBackground';
import Header from './ui/Header';
import InputBox from './translation/InputBox';
import TranslationBox from './translation/TranslationBox';
import ApiInfoBanner from './ui/ApiInfoBanner';
import { useTranslation } from '@/hooks/useTranslation';

const TranslationApp = () => {
	const { inputText, setInputText, translatedText, sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage, isTranslating, error, languages } = useTranslation();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
			<AnimatedBackground />
			<div className="relative z-10 container mx-auto px-4 py-12">
				<Header title="Translator" subtitle="Instant AI-powered translation across languages with neural precision" />
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<InputBox value={inputText} onChange={setInputText} maxLength={200} sourceLanguage={sourceLanguage} onSourceLanguageChange={setSourceLanguage} languages={languages} />
						<TranslationBox value={translatedText} isTranslating={isTranslating} error={error} targetLanguage={targetLanguage} onLanguageChange={setTargetLanguage} languages={languages} />
					</div>
					<ApiInfoBanner />
				</div>
			</div>
		</div>
	);
};

export default TranslationApp;