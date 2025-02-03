// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://devmgramapi.meteo.pl',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
