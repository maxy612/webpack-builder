const merge = require("webpack-merge");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require("cssnano");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const baseConfig = require("./webpack.base");
const vueConfig = require("./webpack.vue");
const reactConfig = require("./webpack.react");
const cdnConfig = require("./libCdn.config");

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

const getCdnFromConfig = (config) => {
  const userCdnConfig = config.libCdn || {};
  const jsCdnConfig = userCdnConfig.js || [];
  const cssCdnConfig = userCdnConfig.css || [];
  const { useLibCdn, type } = config;

  const scripts = ((useLibCdn && cdnConfig[type].js) || []).concat(jsCdnConfig);
  const links = ((useLibCdn && cdnConfig[type].css) || []).concat(cssCdnConfig);

  if (scripts.length || links.length) {
    prodConfig.plugins.push(
      new HtmlWebpackTagsPlugin({
        scripts,
        links,
      })
    );
  }
};

module.exports = (config = {}, webpackConfig) => {
  const params = {
    mode: MODE,
    config,
  };

  // 处理核心库cdn加载
  getCdnFromConfig(config);

  return merge(
    baseConfig(params),
    config.type === "vue" ? vueConfig(params) : reactConfig(params),
    prodConfig,
    webpackConfig(params)
  );
};
