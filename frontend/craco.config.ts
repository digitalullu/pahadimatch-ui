import path from 'path';

const isVisualEditsEnabled = process.env.REACT_APP_ENABLE_VISUAL_EDITS === 'true';
const isHealthCheckEnabled = process.env.ENABLE_HEALTH_CHECK === 'true';

interface Config {
  disableHotReload: boolean;
}

const config: Config = {
  disableHotReload: !isVisualEditsEnabled,
};

interface WebpackConfig {
  webpack: {
    alias: Record<string, string>;
    configure: (webpackConfig: any) => any;
  };
  devServer?: (devServerConfig: any) => any;
  plugins?: Array<{ plugin: any; options?: any }>;
}

const webpackConfig: WebpackConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig: any) => {
      // Add TypeScript extensions
      webpackConfig.resolve.extensions.push('.ts', '.tsx');

      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        if (webpackConfig.entry && typeof webpackConfig.entry === 'object') {
          webpackConfig.entry = Object.keys(webpackConfig.entry).reduce(
            (acc: Record<string, any>, key: string) => {
              const entry = webpackConfig.entry[key];
              acc[key] = Array.isArray(entry)
                ? entry.filter((e: string) => 
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
            (plugin: any) => plugin.constructor.name !== 'HotModuleReplacementPlugin'
          );
        }
      }

      return webpackConfig;
    },
  },
};

if (isVisualEditsEnabled) {
  // Visual edits plugin
  const visualEditsPlugin = require('./plugins/visual-edits/dev-server-setup.js');
  webpackConfig.devServer = visualEditsPlugin.devServerConfig;
  
  const babelMetadataPlugin = require('./plugins/visual-edits/babel-metadata-plugin.js');
  webpackConfig.plugins = [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }: { webpackConfig: any }) => {
          const babelLoader = webpackConfig.module.rules.find((rule: any) =>
            rule.oneOf?.some((r: any) => r.loader?.includes('babel-loader'))
          );

          if (babelLoader) {
            babelLoader.oneOf.forEach((rule: any) => {
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
  // Health check plugin
  const healthCheckPlugin = require('./plugins/health-check/webpack-health-plugin.js');
  const healthEndpoints = require('./plugins/health-check/health-endpoints.js');
  
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }
  
  webpackConfig.plugins.push({
    plugin: healthCheckPlugin,
  });

  const originalDevServer = webpackConfig.devServer;
  webpackConfig.devServer = (devServerConfig: any) => {
    if (originalDevServer) {
      devServerConfig = originalDevServer(devServerConfig);
    }
    return healthEndpoints.setupHealthEndpoints(devServerConfig);
  };
}

export default webpackConfig;
