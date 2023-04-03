import adapter from '@sveltejs/adapter-node';

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
	}
};

export default config;
