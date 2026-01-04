import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: (() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const buildNumber = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0');
    return {
      __APP_VERSION__: JSON.stringify(`${date}.${buildNumber}`),
      __BUILD_TIME__: JSON.stringify(now.toISOString()),
    };
  })(),
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
