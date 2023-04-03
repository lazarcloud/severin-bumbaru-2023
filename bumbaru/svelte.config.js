import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$shared: '../.shared/',
			$utils: '../.shared/utils',
			$db: '../.shared/db',
			$comp: '../.shared/comp',
			$styles: '../.shared/styles',
			$assets: '../.shared/assets',
		}
	},
	preprocess: vitePreprocess()
};

export default config;
