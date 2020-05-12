class ErrorHandler {
  apply(compiler) {
    compiler.hooks.done.tap("done", (stats) => {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        console.log("======= build error ======");
        process.exit(1);
      }
    });
  }
}

module.exports = ErrorHandler;