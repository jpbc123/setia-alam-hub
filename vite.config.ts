import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


const componentTagger = () => {
  return {
    name: 'component-tagger',
    transform(code: string, id: string) {
      return null;
    },
  };
};

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/setia-alam-hub/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), 
    },
  },
}));
