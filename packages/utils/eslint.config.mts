import config from '@legors/tooling-config/eslint/next.mts';

const eslintConfig = [
	...config,
	{
		ignores: ['**/*.gen.ts'],
	},
];

export default eslintConfig;
