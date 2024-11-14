const { defineConfig } = require('cypress');
const webpackConfig = require('./webpack.config.js');
const { devServer } = require('@cypress/webpack-dev-server');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: 'cypress/components/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component-index.html',
    supportFile: false,
  },
  e2e: {
    supportFile: false,
  },
});
