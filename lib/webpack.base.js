const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FrientlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ErrorHandler = require("../plugins/error");

const PRPJECT_ROOT = process.cwd();
const PAGES_PATH =
  path.join(PRPJECT_ROOT, "./src/pages") ||
  path.join(__dirname, "../src/pages");

const getHtmls = () => {
  const entryPath = path.join(PAGES_PATH, "./*/index.js");
  const entryFiles = glob.sync(entryPath);
  const entryRegExp = /pages\/(\w+)\/index.js/;
  const getTemplatePath = (pageName) =>
    path.join(PAGES_PATH, `./${pageName}/index.html`);
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
const cssLoader = [
  {
    loader: "postcss-loader",
    options: { plugins: [autoprefixer()] },
  },
];

const getStyleLoaders = ({ isProd, config, isLess = false }) => {
  const isVue = config.type === "vue";
  const isMobile = config.mobile;
  const cssLoaders = [
    { loader: "css-loader", options: { modules: isVue ? false : true } },
    ...cssLoader,
  ];

  if (isMobile) {
    cssLoaders.push({
      loader: "px2rem-loader",
      options: {
        remUnit: config.mobile.remUnit,
        remPrecision: config.mobile.remPrecision,
      },
    });
  }

  if (isLess) {
    cssLoaders.push("less-loader");
  }

  if (isProd) {
    cssLoaders.unshift(MiniCssExtractPlugin.loader);
  } else {
    cssLoaders.unshift(isVue ? "vue-style-loader" : "style-loader");
  }

  return cssLoaders;
};

module.exports = ({ mode, config }) => {
  const isProd = mode === "production";
  const isVue = config.type === "vue";

  return {
    entry,

    output: {
      path: path.join(PRPJECT_ROOT, "./dist"),
      filename: "js/[name]_[chunkhash:8].js",
    },

    resolve: {
      alias: {
        "@": path.join(PRPJECT_ROOT, "./src"),
      },
      extensions: ['.js', '.json']
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
        },

        {
          test: /\.css$/,
          use: getStyleLoaders({ isProd, config, isLess: false }),
        },

        {
          test: /\.less$/,
          use: getStyleLoaders({ isProd, config, isLess: true }),
        },

        {
          test: /\.(png|jpg|svg|jpe?g|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8048,
                name: "imgs/[name]_[hash:8].[ext]",
                esModule: isVue ? false : true,
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
      new ErrorHandler(),
    ].concat(htmls),

    stats: "errors-only",
  };
};
