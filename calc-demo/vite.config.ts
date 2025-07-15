import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// 🔑 add the test block
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});

