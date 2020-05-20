const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueLoaderOption = require("./vue-loader.conf");

module.exports = ({ mode, config }) => {
  const plugins = [new VueLoaderPlugin()];

  return {
    resolve: {
      extensions: [".vue"],
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
