// build.js
import { build } from 'vite';

build({
  build: {
    outDir: 'dist',
  },
})
  .then(() => console.log('Build completed successfully'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
