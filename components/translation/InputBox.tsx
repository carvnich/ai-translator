'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { InputBoxProps } from '@/types';

const InputBox: React.FC<InputBoxProps> = ({ value, onChange, maxLength, sourceLanguage, onSourceLanguageChange, languages }) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		if (newValue.length <= maxLength) {
			onChange(newValue);
		}
	};

	const remainingChars = maxLength - value.length;
	const showWarning = remainingChars <= 10;

	return (
		<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
			{/* Language Selector Header */}
			<div className="mb-4">
				<LanguageSelector value={sourceLanguage} onChange={onSourceLanguageChange} languages={languages} label="From" />
			</div>

			<div className="relative h-40">
				<div className="absolute top-4 left-4 text-gray-400 z-10">
					<Languages className="w-5 h-5" />
				</div>
				<textarea value={value} onChange={handleInputChange} placeholder="Type your text here to translate..." className="w-full h-full bg-gray-900/70 border border-gray-600/50 rounded-xl p-4 pl-12 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none transition-all duration-200" maxLength={maxLength} />
			</div>

			{/* Character count - always present with fixed height */}
			<div className="flex justify-end mt-3 h-8">
				<div className="flex items-center">
					<div className="text-sm text-gray-400">
						<span className={showWarning ? 'text-orange-400' : ''}>
							{value.length}
						</span>
						<span className="text-gray-500">/{maxLength}</span>
					</div>
				</div>
			</div>

			{/* Warning message */}
			{showWarning && (
				<div className="mt-2 text-sm text-orange-400">
					{remainingChars} characters remaining
				</div>
			)}
		</div>
	);
};

export default InputBox;