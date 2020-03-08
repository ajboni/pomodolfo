import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import builtins from 'builtin-modules'
import sass from 'rollup-plugin-sass';


const production = !process.env.ROLLUP_WATCH;
const watchMethod = process.env.WATCH;
export default {
	input: 'src/browser/main.js',
	output: {
		sourcemap: true,
		format: 'cjs',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	external: ['electron', ...builtins],
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		sass({
			output: 'public/build/bulma.css',
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false,
	}
}



function serve() {

	let started = false;
	let arg = 'start-nodemon'
	if (watchMethod == "renderer") {
		arg = 'start-nomon'
	}

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', arg], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
