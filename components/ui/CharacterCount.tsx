import React from 'react';
import { CharacterCountProps } from '@/types';

const CharacterCount: React.FC<CharacterCountProps> = ({ current, max }) => {
	const getTextColor = () => {
		if (current >= max) return 'text-red-400';
		if (current >= max * 0.9) return 'text-orange-400';
		return '';
	};

	return (
		<div className="text-sm text-gray-400">
			<span className={getTextColor()}>
				{current}
			</span>
			<span className="text-gray-500">/{max}</span>
		</div>
	);
};

export default CharacterCount;