import config from '@legors/tooling-config/eslint/next.mts';

const eslintConfig = [
	...config,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
		},
	},
];

export default eslintConfig;
