import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [
    tailwind(), 
    react(),
    partytown({
      config: {
        forward: ['fbq']
      }
    })
  ],
  output: 'server',
  adapter: netlify()
});