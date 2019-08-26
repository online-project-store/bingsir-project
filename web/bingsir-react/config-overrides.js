/* const { injectBabelPlugin } = require('react-app-rewired');
  module.exports = function override(config, env) {
   config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    return config;
  }; */

const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias, 
    addDecoratorsLegacy
} = require('customize-cra');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = override(
    // antd按需加载，不需要每个页面都引入“antd/dist/antd.css”了
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true //这里一定要写true，否则css和less都不行
    }),
    // 添加装饰器的能力
    //addDecoratorsLegacy(),  使用装饰器需要暴露 create-react-app 的配置npm run eject 看下面配置文件
    // 配置路径别名
    addWebpackAlias({
        '@': resolve("src")
    }),
    addLessLoader({
        javascriptEnabled: true,
        //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
        modifyVars: {
            "@primary-color": "#1890ff"
        }
    })
)


/* @primary - color: #1890ff;                         // 全局主色
@link-color: # 1890 ff; // 链接色
@success - color: #52c41a;                         // 成功色
@warning-color: # faad14; // 警告色
@error - color: #f5222d; // 错误色
@font - size - base: 14 px; // 主字号
@heading - color: rgba(0, 0, 0, .85); // 标题色
@text - color: rgba(0, 0, 0, .65); // 主文本色
@text - color - secondary: rgba(0, 0, 0, .45); // 次文本色
@disabled - color: rgba(0, 0, 0, .25); // 失效色
@border - radius - base: 4 px; // 组件/浮层圆角
@border - color - base: #d9d9d9; // 边框色
@box - shadow - base: 0 2 px 8 px rgba(0, 0, 0, .15); // 浮层阴影

链接： https: //juejin.im/post/5cba71b0e51d45789024d7c9 */

//装饰器使用需要配置的文件
/* 在 babel 中添加 plugins 配置
在 package.json 文件中找到 babel 的配置， 添加如下代码即可：
package.json 
"babel": {
    "presets": [
        "react-app"
    ],
    +"plugins": [
        +[
            +"@babel/plugin-proposal-decorators",
            +{
                "legacy": true
            } +
        ] +
    ]
} */

