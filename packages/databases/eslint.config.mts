import config from '@legors/tooling-config/eslint/base.mts';

const eslintConfig = [
	...config,
	{
		ignores: ['prisma/migrations/**', 'prisma/generated/**'],
	},
];

export default eslintConfig;
