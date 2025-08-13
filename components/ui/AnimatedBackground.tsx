import React from 'react';

const AnimatedBackground = () => (
	<div className="absolute inset-0">
		<div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
		<div className="absolute -bottom-20 right-20 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
	</div>
);

export default AnimatedBackground;