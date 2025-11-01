const path = require('path');

const isVisualEditsEnabled = process.env.REACT_APP_ENABLE_VISUAL_EDITS === 'true';
const isHealthCheckEnabled = process.env.ENABLE_HEALTH_CHECK === 'true';

const config = {
  disableHotReload: !isVisualEditsEnabled,
};

const webpackConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Add TypeScript extensions
      webpackConfig.resolve.extensions.push('.ts', '.tsx');

      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        if (webpackConfig.entry && typeof webpackConfig.entry === 'object') {
          webpackConfig.entry = Object.keys(webpackConfig.entry).reduce(
            (acc, key) => {
              const entry = webpackConfig.entry[key];
              acc[key] = Array.isArray(entry)
                ? entry.filter((e) => 
                    !e.includes('webpack-dev-server') && 
                    !e.includes('webpack/hot')
                  )
                : entry;
              return acc;
            },
            {}
          );
        }

        if (webpackConfig.plugins) {
          webpackConfig.plugins = webpackConfig.plugins.filter(
            (plugin) => plugin.constructor.name !== 'HotModuleReplacementPlugin'
          );
        }
      }

      return webpackConfig;
    },
  },
};

if (isVisualEditsEnabled) {
  const visualEditsPlugin = require('./plugins/visual-edits/dev-server-setup.js');
  webpackConfig.devServer = visualEditsPlugin.devServerConfig;
  
  const babelMetadataPlugin = require('./plugins/visual-edits/babel-metadata-plugin.js');
  webpackConfig.plugins = [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const babelLoader = webpackConfig.module.rules.find((rule) =>
            rule.oneOf?.some((r) => r.loader?.includes('babel-loader'))
          );

          if (babelLoader) {
            babelLoader.oneOf.forEach((rule) => {
              if (rule.loader?.includes('babel-loader')) {
                rule.options = rule.options || {};
                rule.options.plugins = rule.options.plugins || [];
                rule.options.plugins.push(babelMetadataPlugin);
              }
            });
          }

          return webpackConfig;
        },
      },
    },
  ];
}

if (isHealthCheckEnabled) {
  const healthCheckPlugin = require('./plugins/health-check/webpack-health-plugin.js');
  const healthEndpoints = require('./plugins/health-check/health-endpoints.js');
  
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }
  
  webpackConfig.plugins.push({
    plugin: healthCheckPlugin,
  });

  const originalDevServer = webpackConfig.devServer;
  webpackConfig.devServer = (devServerConfig) => {
    if (originalDevServer) {
      devServerConfig = originalDevServer(devServerConfig);
    }
    return healthEndpoints.setupHealthEndpoints(devServerConfig);
  };
}

module.exports = webpackConfig;
