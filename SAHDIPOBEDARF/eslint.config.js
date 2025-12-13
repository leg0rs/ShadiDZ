import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const reactRecommendedRules = react.configs.recommended?.rules ?? {};
const reactJsxRuntimeRules = react.configs['jsx-runtime']?.rules ?? {};

export default defineConfig([
	globalIgnores(['dist', 'node_modules', 'public']),
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			react,
			'unused-imports': unusedImports,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		rules: {
			...reactRecommendedRules,
			...reactJsxRuntimeRules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^[A-Z_]',
					argsIgnorePattern: '^_',
				},
			],
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react/jsx-no-target-blank': 'error',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'unused-imports/no-unused-imports': 'error',
		},
	},
	eslintPluginPrettierRecommended,
]);
