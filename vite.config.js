import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({

  //TODO : base / instead of /WealthHealth might be an issue when building
  base: "/WealthHealth",
  plugins: [react()],
});
