import { NextRequest, NextResponse } from 'next/server';

// Language code mapping for Lingva
const languageMap: { [key: string]: string; } = {
	auto: 'auto',
	english: 'en',
	spanish: 'es',
	french: 'fr',
	german: 'de',
	italian: 'it',
	portuguese: 'pt',
	russian: 'ru',
	japanese: 'ja',
	korean: 'ko',
	chinese: 'zh',
	arabic: 'ar',
	hindi: 'hi',
	dutch: 'nl',
};

export async function POST(request: NextRequest) {
	try {
		const { text, sourceLanguage, targetLanguage } = await request.json();

		if (!text || !targetLanguage) {
			return NextResponse.json(
				{ error: 'Text and target language are required' },
				{ status: 400 }
			);
		}

		if (text.length > 500) {
			return NextResponse.json(
				{ error: 'Text is too long. Maximum 500 characters allowed.' },
				{ status: 400 }
			);
		}

		const sourceCode = languageMap[sourceLanguage] || 'auto';
		const targetCode = languageMap[targetLanguage] || 'es';

		const response = await fetch(
			`https://lingva.ml/api/v1/${sourceCode}/${targetCode}/${encodeURIComponent(text)}`,
			{
				headers: {
					'User-Agent': 'LinguaFlow/1.0',
				},
			}
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Translation service is currently unavailable. Please try again later.' },
				{ status: 503 }
			);
		}

		const data = await response.json();

		if (!data.translation) {
			return NextResponse.json(
				{ error: 'Translation failed. Please try again.' },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			translation: data.translation
		});
	} catch (error: any) {
		console.error('Translation error:', error);

		return NextResponse.json(
			{ error: 'Translation service is currently unavailable. Please try again later.' },
			{ status: 503 }
		);
	}
}