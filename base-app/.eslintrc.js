/* global module */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
	],
	plugins: [
		'react',
		'@typescript-eslint',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	env: {
		// es6: true,
		browser: true,
		jest: true,
		// node: false,
	},
	globals: {
		JSX: true,
		React: true,
		// "module": true,
		// "process": true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/no-unused-vars': 2,
		'@typescript-eslint/naming-convention': 0,
		'@typescript-eslint/prefer-optional-chain': 0,
		'@typescript-eslint/no-namespace': 0,
		'@typescript-eslint/no-explicit-any': 0,
		//允许使用require()
		'@typescript-eslint/no-var-requires': 0,
		//防止在react组件定义中缺少props验证
		'react/prop-types': 0,
		'react/display-name': 0,
		'max-len': 0,
		//要求使用 let 或 const 而不是 var
		'no-var': 2,
		//禁止出现未使用过的变量
		'no-unused-vars': 1,
		// 'no-console': 1,
	},
};
