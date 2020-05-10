const merge = require("webpack-merge");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const cssnano = require("cssnano");

const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",

  module: {
    rules: [
      { test: /\.css$/, loader: "ignore-loader" },
      { test: /\.less$/, loader: "ignore-loader" },
    ],
  },

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
    new OptimizeCss({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),

    new HtmlWebpackTagsPlugin({
      scripts: [
        {
          path: "https://unpkg.com/react@16/umd/react.production.min.js",
          external: {
            packageName: "react",
            variableName: "React",
          },
        },

        {
          path:
            "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
          external: {
            packageName: "react-dom",
            variableName: "ReactDOM",
          },
        },
      ],
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
