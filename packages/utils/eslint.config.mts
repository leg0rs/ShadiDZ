import config from '@tealdeer/tooling-config/eslint/next.mts';

const eslintConfig = [
	...config,
	{
		ignores: ['**/*.gen.ts'],
	},
];

export default eslintConfig;
