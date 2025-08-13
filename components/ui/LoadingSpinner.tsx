import React from 'react';
import { LoadingSpinnerProps } from '@/types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => (
	<div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 rounded-xl">
		<div className="flex items-center space-x-2 text-blue-400">
			<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
			<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
			<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-400"></div>
			<span className="ml-2 text-sm">{message}</span>
		</div>
	</div>
);

export default LoadingSpinner;