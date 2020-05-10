const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webpack.base");

const devConfig = {
  mode: "development",

  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: "errors-only",
  },

  devtool: "cheap-source-map",

  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(baseConfig, devConfig);
