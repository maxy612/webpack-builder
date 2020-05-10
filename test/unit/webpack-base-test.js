const assert = require('assert')
const baseConfig = require("../../lib/webpack.base");

describe("webpack.base.js test case", () => {
  it("entry", () => {
    assert.equal(
      baseConfig.entry.search,
      "/Users/hunbao/workSpace/webpack-lib/test/smoke/template/src/pages/search/index.js"
    );
  });
});
