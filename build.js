import { build } from 'vite';
import { defineConfig } from 'vite';

// 定义Vite配置
const config = defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html'
    }
  }
});

// 执行构建
async function runBuild() {
  try {
    console.log('Starting build...');
    await build(config);
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
  }
}

runBuild();