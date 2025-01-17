module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'max-len': ['error', { code: 80 }],
		'no-restricted-syntax': 'off',
		'no-await-in-loop': 'off',
		'guard-for-in': 'off',
	},
};
