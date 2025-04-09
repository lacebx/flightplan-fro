const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/2025/flight-plan/t8/'
    : '/',
  transpileDependencies: [],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  lintOnSave: false
}
