const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueLoaderOption = require("./vue-loader.conf");

module.exports = ({ mode, config }) => {
  const isProd = mode === "production";
  const plugins = [new VueLoaderPlugin()];

  if (isProd) {
    plugins.push(
      new HtmlWebpackTagsPlugin({
        scripts: {
          path:
            "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.runtime.min.js",
          external: {
            packageName: "vue",
            variableName: "Vue",
          },
        },
      })
    );
  }

  return {
    resolve: {
      extensions: [".js", ".vue", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: VueLoaderOption,
        },
      ],
    },

    plugins,
  };
};
