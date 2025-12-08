import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
	input: './openapi.json',
	output: {
		path: 'src/api',
		lint: 'eslint',
		format: 'prettier',
	},
	plugins: [
		'@hey-api/client-axios',
		'@hey-api/schemas',
		'@hey-api/sdk',
		{
			enums: 'javascript',
			name: '@hey-api/typescript',
		},
	],
});
