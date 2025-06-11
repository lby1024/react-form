import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/react-form',				 
  publicPath: '/react-form/', 
  themeConfig: {
    name: 'react-form',
    logo: false,
    lastUpdated: false,
    prefersColor: { default: 'light', switch: false },
  },
});
