export interface Language {
	code: string;
	name: string;
}

export interface TranslationRequest {
	text: string;
	sourceLanguage: string;
	targetLanguage: string;
}

export interface TranslationResponse {
	translation: string;
	error?: string;
}

export interface InputBoxProps {
	value: string;
	onChange: (value: string) => void;
	maxLength: number;
	sourceLanguage: string;
	onSourceLanguageChange: (language: string) => void;
	languages: Language[];
}

export interface TranslationBoxProps {
	value: string;
	isTranslating: boolean;
	error: string;
	targetLanguage: string;
	onLanguageChange: (language: string) => void;
	languages: Language[];
}

export interface HeaderProps {
	title: string;
	subtitle: string;
}

export interface LoadingSpinnerProps {
	message?: string;
}

export interface CharacterCountProps {
	current: number;
	max: number;
}

export interface LanguageSelectorProps {
	value: string;
	onChange: (value: string) => void;
	languages: Language[];
	label: string;
}