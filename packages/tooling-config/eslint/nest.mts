import eslint from '@eslint/js';
import prettierEslint from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import common from './common.mts';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	prettierEslint,
	...common,
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.mts', '*.mjs', '*.ts'],
				},
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
	},
	{
		ignores: ['node_modules/', 'dist/', 'build/'],
	},
);
