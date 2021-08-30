const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // All Variables on https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      '@primary-color': '#c1c1c1',
      '@menu-dark-bg': '#c2c2c2',
      '@layout-sider-background': '#c2c2c2'
    }
  })
);
