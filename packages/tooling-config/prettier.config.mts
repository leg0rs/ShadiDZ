import { type Config } from 'prettier';

const config: Config = {
	// Твои основные настройки
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	semi: true,
	bracketSpacing: true,
	printWidth: 100,
	endOfLine: 'auto',

	// Специфичные переопределения
	overrides: [
		{
			files: ['*.jsonc'],
			options: {
				parser: 'jsonc',
				// JSONC (например, tsconfig или turbo.jsonc) часто не любят висячие запятые,
				// поэтому здесь мы их принудительно отключаем, несмотря на глобальную настройку.
				trailingComma: 'none',
			},
		},
	],
};

export default config;
