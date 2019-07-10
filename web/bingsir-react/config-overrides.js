/* const { injectBabelPlugin } = require('react-app-rewired');
  module.exports = function override(config, env) {
   config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    return config;
  }; */

const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
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
        style: true //这里一定要写true，css和less都不行
    }),
    // 配置路径别名
    addWebpackAlias({
        '@': resolve("src")
    }),
    addLessLoader({
        javascriptEnabled: true,
        //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
        modifyVars: {
            "@primary-color": "#f47983"
        }
    })
)
