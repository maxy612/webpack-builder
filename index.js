const WebpackDev = require("./lib/webpack.dev");
const WebpackProd = require("./lib/webpack.prod");
const defaultConfig = require("./lib/config.default");

module.exports = (config = {}, webpackConfigFn = (mode, config) => {}) => {
  const configs = Object.assign(defaultConfig, config);
  
  return {
    WebpackDev: WebpackDev(configs, webpackConfigFn),
    WebpackProd: WebpackProd(configs, webpackConfigFn),
  };
};
