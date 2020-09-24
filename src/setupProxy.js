const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware(
          '/api', {
            target: 'http://116.62.47.177:3000',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ""
            }
          })
      );
}