const merge = require("webpack-merge");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require("cssnano");

const baseConfig = require("./webpack.base");
const vueConfig = require("./webpack.vue");
const reactConfig = require("./webpack.react");

const MODE = "production";

const prodConfig = {
  mode: "production",

  // 提取公共模块
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:8].css",
    }),
    new OptimizeCss({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
};

module.exports = (config = {}, webpackConfig) => {
  const params = {
    mode: MODE,
    config,
  };

  return merge(
    baseConfig(params),
    config.type === "vue" ? vueConfig(params) : reactConfig(params),
    prodConfig,
    webpackConfig(params)
  );
};
