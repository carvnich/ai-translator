'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { LanguageSelectorProps } from '@/types';

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, languages, label }) => (
	<div className="w-full">
		<label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
			{label}
		</label>
		<div className="relative">
			<select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none bg-gray-900/70 border border-gray-600/50 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent cursor-pointer">
				{languages.map((lang) => (
					<option key={lang.code} value={lang.code} className="bg-gray-800">
						{lang.name}
					</option>
				))}
			</select>
			<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
		</div>
	</div>
);

export default LanguageSelector;