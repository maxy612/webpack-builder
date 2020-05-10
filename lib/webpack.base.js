const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FrientlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const autoprefixer = require("autoprefixer");

const PRPJECT_ROOT = process.cwd();
const PAGES_PATH = path.join(PRPJECT_ROOT, "./src/pages")
  || path.join(__dirname, "../src/pages");

const getHtmls = () => {
  const entryPath = path.join(PAGES_PATH, "./*/index.js");
  const entryFiles = glob.sync(entryPath);
  const entryRegExp = /pages\/(\w+)\/index.js/;
  const getTemplatePath = (pageName) => path.join(PAGES_PATH, `./${pageName}/index.html`);
  const entry = {};
  const htmls = [];
  let matchEntryItem;
  let pageName;

  entryFiles.forEach((entryItem) => {
    matchEntryItem = entryItem.match(entryRegExp);
    pageName = (matchEntryItem && matchEntryItem[1]) || "";

    if (!pageName) return;

    entry[pageName] = entryItem;
    htmls.push(
      new HtmlWebpackPlugin({
        template: getTemplatePath(pageName),
        inject: true,
        chunks: [pageName],
        filename: `${pageName}.html`,
        minify: {
          html5: true,
          minifyJS: true,
          minifyCSS: true,
          removeComments: false,
          preserveLineBreaks: false,
          collapseBooleanAttributes: true,
        },
      })
    );
  });

  return {
    entry,
    htmls,
  };
};

const { entry, htmls } = getHtmls();

module.exports = {
  entry,

  output: {
    path: path.join(PRPJECT_ROOT, "./dist"),
    filename: "js/[name]_[chunkhash:8].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { modules: true } },
          {
            loader: "postcss-loader",
            options: { plugins: [autoprefixer()] },
          },
          {
            loader: "px2rem-loader",
            options: { remUnit: 75, remPrecision: 6 },
          },
          "less-loader",
        ],
      },

      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8048,
              name: "imgs/[name]_[hash:8].[ext]",
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new FrientlyErrorsPlugin(),
    function ErrorHandle() {
      this.hooks.done.tap("done", (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log("======= build error ======");
          process.exit(1);
        }
      });
    },
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:8].css",
    }),
  ].concat(htmls),

  stats: "errors-only",
};
