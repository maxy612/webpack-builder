### webpack打包脚手架(可自主决定该项目是React项目还是Vue项目)

#### 用法
1. 安装
```shell
yarn add maxy-webpack-lib -D // 或者 npm install maxy-webpack-lib --save-dev
```

2. 在项目根目录下建立webpack.prod.js和webpack.dev.js, 在文件中导入默认配置
```javascript
// webpack.prod.js
const { WebpackDev } = require('maxy-webpack-lib');

/**
 * 项目业务打包配置项
 * @params type {string} 项目类型 可选值：[vue, react]
 * @params mobile {object} 是否是开发h5页面
 * ** @params remUnit {number} 1rem等于多少px
 * ** @params remPrecision {number} 计算出rem保留几位小数
 **/
const configOptions = {}; 

/**
 * 用户自定义webpack配置
 * @params mode {string} 当前开发模式 development/production
 * @params config {object} 业务打包配置项，同configOptions
 **/
const webpackConfigFn = ({ mode, config }) => {
  return {
    plugins: [],
    module: {
      rules: []
    }
  };
}

module.exports = WebpackDev(configOptions, webpackConfigFn);

// webpack.prod.js
const { WebpackProd } = require('maxy-webpack-lib');
module.exports = WebpackProd(configOptions, webpackConfigFn);
```

3. 在项目根目录下放置 .babelrc, 内容为
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

4. 在package.json下scripts增加build 和 dev两个命令.
```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --config webpack.dev.js"
  }
}
```

#### 项目目录结构默认为多页应用结构
|-- src
|------ pages/
|---------- home/
|-------------- index.js 项目入口，必须有
|-------------- index.html 项目模板，必须有

> 项目中的react, vue等在打包时会配置为cdn地址，一般无需手动处理。