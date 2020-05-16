const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");
const Mocha = require("mocha");

const mocha = new Mocha({
  timeout: "10000ms",
});

process.chdir(path.join(__dirname, "./template"));

rimraf("./dist", () => {
  const { WebpackDev } = require("../../index")();

  webpack(WebpackDev, (err, stats) => {
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
  });
});
