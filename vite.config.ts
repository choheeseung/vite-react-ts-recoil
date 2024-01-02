import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const envDir = resolve(__dirname, 'env');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, envDir);
	const basePath = env.VITE_BASE_PATH;

	return {
		plugins: [react()],
		base: basePath,
		envDir: envDir,
		// 전역 상수 선언
		/*define: {
			'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
			__UNDEF__: JSON.stringify('undefined'),
			__CP__: basePath === '/' ? JSON.stringify('') : JSON.stringify(basePath),
		},*/
		resolve: {
			// 경로 별칭
			alias: {
				'@': resolve(__dirname, 'src'),
				'@scss': resolve(__dirname, 'src/assets/scss'),
				'@comps': resolve(__dirname, 'src/components'),
			},
		},
		build: {
			// 이 값보다 작은 크기로 import 되거나 참조된 에셋은 부가적인 http 요청을 피하고자
			// base64 URL로 인라인 처리됩니다. 만일 인라인 변환을 사용하지 않으려면 0 으로 설정하세요
			// assetsInlineLimit: 0,
			sourcemap: mode !== 'production' ? true : 'hidden',
			//sourcemap: true,
		},
	};
});
