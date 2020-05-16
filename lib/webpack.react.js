const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

module.exports = ({ mode, config }) => {
  const isProd = mode === "production";
  const plugins = [];

  if (isProd) {
    plugins.push(
      new HtmlWebpackTagsPlugin({
        scripts: [
          {
            path:
              "https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js",
            external: {
              packageName: "react",
              variableName: "React",
            },
          },

          {
            path:
              "https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js",
            external: {
              packageName: "react-dom",
              variableName: "ReactDOM",
            },
          },
        ],
      })
    );
  }

  return {
    plugins,
  };
};
