### Webpack项目开发脚手架(Vue或React可选)

#### 简介

该项目是一个即开即用的Webpack项目开发脚手架，支持Vue和React项目。用户通过安装maxy-webpack-lib包，按照一定的目录结构来构建项目，即可快速搭建项目，投入到开发工作中。类似于vue-cli或create-react-app，用户可以自由选择选择哪种框架来开发项目。

----------------------------

#### 目标

1. 快速初始化项目，减少开发前的准备工作。
2. 支持Vue和React项目自由选择。
3. 支持自定义传入Webpack配置。

----------------------

#### 用法

1. 安装

   ```shell
   ## 前置依赖 webpack-dev-server。确认当前项目安装了此依赖，如果没有，请运行:
   yarn add webpack-dev-server -D 
   ## 或者
   npm i webpack-dev-server -D
   
   yarn add maxy-webpack-lib -D 
   ## 或者
   npm i maxy-webpack-lib --save-dev
   ```

   

2. 创建如下的项目结构：

   ```javascript
   // | build
   // 	--- index.js 构建配置入口
   //	---	dev.js
   //	---	prod.js
   // | src
   //  --- pages
   //  ------ index
   //  --------- index.html
   //  --------- index.less (可选)
   //  --------- index.js
   // | .babelrc react项目中需要额外引入 @babel/preset-react, 其余情况下要有@babel/preset-env
   // | package.json
   ```

   

3. 引入项目

   ```javascript
   // build/index.js
   const WebpackConfig = require('maxy-webpack-lib');
   const config = {
     type: 'react', // 或者vue，默认为react 标识项目是用react还是vue
     useLibCdn: true, // 或false, 默认为true 项目中依赖库是否引用默认的cdn资源。在项目打包时，会自动将vue或者react及react-dom这样的核心库替换成cdn资源，如果不需要，可将此项置为false
     mobile: false || {
       remUnit: 75, // 由开发者根据设计稿和项目来定。表示html中1rem代表多少像素
       remPrecision: 6 // 在px转rem过程中保留几位小数
     }, // 配置移动端项目px转rem。如果不是移动端项目或者有自己的移动端配置，可将此项置为false。配置此项后，在项目中出现的px会按照配置转换成rem
     
     libCdnConfig: {
       js: [], // 参照 html-webpack-tag-plugin中scripts配置(https://www.npmjs.com/package/html-webpack-tags-plugin)
       css: [], // 参照 html-webpack-tag-plugin中links配置(https://www.npmjs.com/package/html-webpack-tags-plugin)
     } // 配置额外的cdn资源。在打包时引用到的资源不会被打包进代码中，而是采用线上cdn资源。
   }
   
   module.exports = WebpackConfig(config, (mode, curConfig) => {
     // mode: development 或 production，代表当前是开发模式还是生产模式
     // config: 当前配置信息
     // return object; 返回的是webpack的配置信息，该返回会通过webpack-merge合并到现有配置中，用于用户自定义一些webpack配置。
     return {
       plugins: [],
       resolve: {}
     }
   })
   
   // build/dev.js
   const { WebpackDev } = require('./index');
   module.exports = WebpackDev;
   
   // build/prod.js
   const { WebpackProd } = require('./index');
   module.exports = WebpackProd;
   ```

4. 在package.json中添加scripts开发和打包命令

   ```json
   // package.json
   {
   	"scripts": {
       "dev": "webpack-dev-server --config ./build/dev.js",
       "build": "webpack --config ./build/prod.js"
     } 
   }
   ```

5. 在.babrlrc中引入babel的插件

   ```json
   {
     "presets": [
       "@babel/preset-env"
     ]
   }
   
   // 在type为react或者未配置时需要加上@babel/preset-react。其它的babel配置，按需引入。同时不要忘了安装对应的依赖哦。
   ```

6. 创建完成。现在就可以通过yarn dev或者yarn build来体验了。