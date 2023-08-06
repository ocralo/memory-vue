require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
		'@vue/eslint-config-prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	settings: {
		next: {
			rootDir: ['apps/*/'],
		},
	},
	rules: {
		quotes: ['error', 'single'],
	},
}
