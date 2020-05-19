const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");
const Mocha = require("mocha");

const mocha = new Mocha({
  timeout: "10000ms",
});

process.chdir(path.join(__dirname, "./template"));

rimraf("./dist", () => {
  const { WebpackProd } = require("../../index")({
    type: "vue",
    useLibCdn: true,
    libCdn: {
      js: [
        {
          path:
            "https://cdnjs.cloudflare.com/ajax/libs/vuex/4.0.0-beta.2/vuex.global.prod.min.js",
          external: {
            variableName: "Vuex",
            packageName: "vuex",
          },
        },
      ],
      css: [
        {
          path:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
          append: false
        },
      ],
    },
  });

  webpack(WebpackProd, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
      return;
    }

    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      })
    );

    console.log("Webpack build success, begin run test.");

    mocha.addFile(path.join(__dirname, "html-test.js"));
    mocha.addFile(path.join(__dirname, "css-js-test.js"));

    mocha.run();
  });
});
