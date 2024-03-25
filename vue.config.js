module.exports = {
  lintOnSave: false,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  devServer: {
    port: 8080,
    proxy: {
      '/apis': {
        target: 'http://localhost:8001/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
}
