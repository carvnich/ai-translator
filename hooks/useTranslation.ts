'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/types';

export const useTranslation = () => {
	const [inputText, setInputText] = useState('');
	const [translatedText, setTranslatedText] = useState('');
	const [sourceLanguage, setSourceLanguage] = useState('auto');
	const [targetLanguage, setTargetLanguage] = useState('spanish');
	const [isTranslating, setIsTranslating] = useState(false);
	const [error, setError] = useState('');

	const languages: Language[] = [
		{ code: 'auto', name: 'Auto-detect' },
		{ code: 'english', name: 'English' },
		{ code: 'spanish', name: 'Spanish' },
		{ code: 'french', name: 'French' },
		{ code: 'german', name: 'German' },
		{ code: 'italian', name: 'Italian' },
		{ code: 'portuguese', name: 'Portuguese' },
		{ code: 'russian', name: 'Russian' },
		{ code: 'japanese', name: 'Japanese' },
		{ code: 'korean', name: 'Korean' },
		{ code: 'chinese', name: 'Chinese (Simplified)' },
		{ code: 'arabic', name: 'Arabic' },
		{ code: 'hindi', name: 'Hindi' },
		{ code: 'dutch', name: 'Dutch' },
	];

	// Simple translation function using Lingva
	const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
		const response = await fetch('/api/translate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, sourceLanguage: sourceLang, targetLanguage: targetLang })
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || 'Translation failed');
		}

		return data.translation;
	};

	const handleTranslate = async () => {
		if (!inputText.trim()) {
			setTranslatedText('');
			return;
		}

		setIsTranslating(true);
		setError('');

		try {
			const translation = await translateText(inputText, sourceLanguage, targetLanguage);
			setTranslatedText(translation);
		} catch (err: any) {
			setError(err.message || 'Translation failed. Please try again.');
			setTranslatedText('');
		} finally {
			setIsTranslating(false);
		}
	};

	// Auto-translate when input changes (with debounce)
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (inputText.trim()) {
				handleTranslate();
			} else {
				setTranslatedText('');
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [inputText, sourceLanguage, targetLanguage]);

	return { inputText, setInputText, translatedText, sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage, isTranslating, error, languages };
};