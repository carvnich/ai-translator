import React from 'react';
import { Languages, Sparkles } from 'lucide-react';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => (
	<div className="text-center mb-12">
		<div className="flex items-center justify-center mb-4">
			<Languages className="w-8 h-8 text-blue-400 mr-3" />
			<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent">
				{title}
			</h1>
			<Sparkles className="w-8 h-8 text-blue-400 ml-3" />
		</div>
		<p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

export default Header;