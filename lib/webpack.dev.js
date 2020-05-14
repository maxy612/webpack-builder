const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webpack.base");

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

module.exports = merge(baseConfig, devConfig);
