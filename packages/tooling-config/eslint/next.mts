import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import common from './common.mts';

import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...common,
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: {
			'@next/next': pluginNext,
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			...pluginNext.configs.recommended.rules,
		},
	},
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	pluginReact.configs.flat.recommended,
	{
		name: 'legors',
		languageOptions: {
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
		},
	},
];
