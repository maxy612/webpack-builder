const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webpack.base");
const vueConfig = require("./webpack.vue");
const reactConfig = require("./webpack.react");

const MODE = "development";

const devConfig = {
  mode: "development",

  output: {
    filename: "js/[name].js",
  },

  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: "errors-only",
  },

  devtool: "source-map",

  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = (config = {}, webpackConfig) => {
  const params = {
    mode: MODE,
    config
  }

  return merge(
    baseConfig(params),
    config.type === "vue"
      ? vueConfig(params)
      : reactConfig(params),
    devConfig,
    webpackConfig(params),
  );
};
